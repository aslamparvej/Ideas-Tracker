import { createContext, useContext, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

const TASK_DATABASE_ID = `${import.meta.env.VITE_APPWRITE_IDEAS_DATABASE_ID}`;
const TASK_COLLECTION_ID = `${
  import.meta.env.VITE_APPWRITE_TASK_COLLECTION_ID
}`;

const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function add(task) {
    setLoading(true);
    try {
      const response = await databases.createDocument(
        TASK_DATABASE_ID,
        TASK_COLLECTION_ID,
        ID.unique(),
        task,
      );
      setTasks((prev) => [response, ...prev]);
      setError("");
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function update(taskId, data) {
    setLoading(true);
    try {
      const response = await databases.updateDocument(
        TASK_DATABASE_ID,
        TASK_COLLECTION_ID,
        taskId,
        data,
      );

      setTasks((prev) =>
        prev.map((task) => (task.$id === taskId ? response : task)),
      );
      setError("");
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function complete(taskId) {
    return update(taskId, {
      completed: true,
    });
  }

  async function init(userId, projectId) {
    setLoading(true);
    try {
      const queries = [
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt"),
      ];

      if (projectId) {
        queries.push(Query.equal("ideas", projectId));
      }

      const response = await databases.listDocuments(
        TASK_DATABASE_ID,
        TASK_COLLECTION_ID,
        queries,
      );
      setTasks(response.documents);
      setError("");
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <TaskContext.Provider
      value={{ tasks, add, update, complete, init, loading, error }}
    >
      {children}
    </TaskContext.Provider>
  );
}
