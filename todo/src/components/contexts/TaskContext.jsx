import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../services/supabase";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    if (!user) throw new Error("User must be logged in");

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            user_id: user.id,
            title: taskData.title,
            notes: taskData.notes || null,
            status: taskData.status || "pending",
            due_date: taskData.dueDate
              ? new Date(taskData.dueDate).toISOString()
              : null,
            priority: taskData.priority || "medium"
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }

      setTasks((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      // Convert frontend field names to database field names
      const dbUpdates = {
        ...updates,
        due_date: updates.dueDate
          ? new Date(updates.dueDate).toISOString()
          : updates.due_date,
        updated_at: new Date().toISOString()
      };

      // Remove frontend-specific field names
      delete dbUpdates.dueDate;

      const { data, error } = await supabase
        .from("tasks")
        .update(dbUpdates)
        .eq("id", taskId)
        .select()
        .single();

      if (error) {
        console.error("Supabase update error:", error);
        throw error;
      }

      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? data : task))
      );
      return data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);

      if (error) {
        console.error("Supabase delete error:", error);
        throw error;
      }

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  const toggleTaskStatus = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newStatus = task.status === "completed" ? "pending" : "completed";
    await updateTask(taskId, { status: newStatus });
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const value = {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    fetchTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
