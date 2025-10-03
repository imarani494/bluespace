import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useAuth } from "./useAuth";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    if (!user) return { data: null, error: new Error("No user logged in") };

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            ...taskData,
            user_id: user.id,
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;
      setTasks((prev) => [data[0], ...prev]);
      return { data, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err };
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq("id", taskId)
        .select();

      if (error) throw error;
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? data[0] : task))
      );
      return { data, error: null };
    } catch (err) {
      setError(err.message);
      return { data: null, error: err };
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);

      if (error) throw error;
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      return { error: null };
    } catch (err) {
      setError(err.message);
      return { error: err };
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks
  };
};
