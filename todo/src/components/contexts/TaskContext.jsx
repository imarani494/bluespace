import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) {
      console.log('No user, skipping task fetch');
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Fetching tasks for user:', user.id, user.email);

      const { data, error: supabaseError, count } = await supabase
        .from('tasks')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('❌ Supabase fetch error:', supabaseError);
        throw new Error(`Database error: ${supabaseError.message}`);
      }
      
      console.log(`✅ Fetched ${data?.length || 0} tasks:`, data);
      setTasks(data || []);
    } catch (error) {
      console.error('❌ Error fetching tasks:', error);
      setError(error.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    if (!user) {
      throw new Error('Please log in to add tasks');
    }

    try {
      console.log('📝 Adding task:', taskData);
      
      const taskToInsert = {
        user_id: user.id,
        title: taskData.title.trim(),
        notes: taskData.notes?.trim() || null,
        status: taskData.status || 'pending',
        due_date: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        priority: taskData.priority || 'medium',
      };

      console.log('📤 Inserting task to database:', taskToInsert);

      const { data, error: supabaseError } = await supabase
        .from('tasks')
        .insert([taskToInsert])
        .select()
        .single();

      if (supabaseError) {
        console.error('❌ Supabase insert error:', supabaseError);
        
        // More specific error messages
        if (supabaseError.code === '42501') {
          throw new Error('Permission denied. Check RLS policies.');
        } else if (supabaseError.code === '23505') {
          throw new Error('Task already exists.');
        } else {
          throw new Error(`Failed to add task: ${supabaseError.message}`);
        }
      }

      if (!data) {
        throw new Error('No data returned from database');
      }

      console.log('✅ Task added successfully:', data);
      setTasks(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('❌ Error adding task:', error);
      throw error;
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      console.log('🔄 Updating task:', taskId, updates);
      
      const dbUpdates = {
        ...updates,
        due_date: updates.dueDate ? new Date(updates.dueDate).toISOString() : updates.due_date,
      };
      
      delete dbUpdates.dueDate;

      console.log('📤 Database updates:', dbUpdates);

      const { data, error: supabaseError } = await supabase
        .from('tasks')
        .update(dbUpdates)
        .eq('id', taskId)
        .select()
        .single();

      if (supabaseError) {
        console.error('❌ Supabase update error:', supabaseError);
        throw new Error(`Failed to update task: ${supabaseError.message}`);
      }

      console.log('✅ Task updated successfully:', data);
      setTasks(prev => prev.map(task => task.id === taskId ? data : task));
      return data;
    } catch (error) {
      console.error('❌ Error updating task:', error);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      console.log('🗑️ Deleting task:', taskId);

      const { error: supabaseError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (supabaseError) {
        console.error('❌ Supabase delete error:', supabaseError);
        throw new Error(`Failed to delete task: ${supabaseError.message}`);
      }

      console.log('✅ Task deleted successfully');
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('❌ Error deleting task:', error);
      throw error;
    }
  };

  const toggleTaskStatus = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await updateTask(taskId, { status: newStatus });
  };

  const clearError = () => setError(null);

  useEffect(() => {
    if (user) {
      console.log('👤 User changed, fetching tasks...');
      fetchTasks();
    } else {
      console.log('👤 No user, clearing tasks');
      setTasks([]);
      setLoading(false);
      setError(null);
    }
  }, [user]);

  const value = {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    fetchTasks,
    clearError,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};