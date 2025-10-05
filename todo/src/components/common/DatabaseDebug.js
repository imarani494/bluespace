
import React from "react";
import { useTasks } from "../../contexts/TaskContext";
import { useAuth } from "../../contexts/AuthContext";

const DatabaseDebug = () => {
  const { tasks, loading, error, fetchTasks } = useTasks();
  const { user } = useAuth();

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black text-white p-4 rounded-lg text-xs max-w-md border border-gray-600">
      <div className="font-bold mb-2">Database Debug</div>

      <div className="space-y-1">
        <div>
          <strong>User:</strong> {user?.email || "Not logged in"}
        </div>
        <div>
          <strong>User ID:</strong>{" "}
          {user?.id ? `${user.id.substring(0, 8)}...` : "N/A"}
        </div>
        <div>
          <strong>Tasks:</strong> {tasks.length} items
        </div>
        <div>
          <strong>Loading:</strong>{" "}
          <span className={loading ? "text-yellow-400" : "text-green-400"}>
            {loading.toString()}
          </span>
        </div>
        <div>
          <strong>Error:</strong>{" "}
          <span className={error ? "text-red-400" : "text-green-400"}>
            {error || "None"}
          </span>
        </div>
      </div>

      {tasks.length > 0 && (
        <div className="mt-2">
          <div className="font-bold mb-1">Sample Task:</div>
          <div className="text-gray-300">
            Title: {tasks[0]?.title}
            <br />
            Status: {tasks[0]?.status}
            <br />
            Priority: {tasks[0]?.priority}
            <br />
            ID: {tasks[0]?.id?.substring(0, 8)}...
          </div>
        </div>
      )}

      <button
        onClick={fetchTasks}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
      >
        Refresh Tasks
      </button>
    </div>
  );
};

export default DatabaseDebug;
