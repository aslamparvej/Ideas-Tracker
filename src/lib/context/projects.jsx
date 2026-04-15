import { createContext, useContext, useState, useEffect } from "react";
import { ID, Query } from "appwrite";
import { databases } from "../appwrite";

import { useUser } from "./user";

const PROJECT_DATABASE_ID = `${
  import.meta.env.VITE_APPWRITE_IDEAS_DATABASE_ID
}`;
const PROJECT_COLLECTION_ID = `${
  import.meta.env.VITE_APPWRITE_IDEAS_COLLECTION_ID
}`;

const ProjectContext = createContext();

export function useProjects() {
  return useContext(ProjectContext);
}

export function ProjectsProvider(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const { current } = useUser();

  async function add(project) {
    try {
      setLoading(true);
      const response = await databases.createDocument(
        PROJECT_DATABASE_ID,
        PROJECT_COLLECTION_ID,
        ID.unique(),
        project,
      );
      setProjects((prev) => [response, ...prev].slice(0, 10));
      return response;
    } catch (error) {
      console.log("Error to add a project", error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function remove(id) {
    try {
      setLoading(true);
      await databases.deleteDocument(
        PROJECT_DATABASE_ID,
        PROJECT_COLLECTION_ID,
        id,
      );
      setProjects((prev) => prev.filter((p) => p.$id !== id));
    } catch (error) {
      console.log("Error deleting project");
    } finally {
      setLoading(false);
    }
  }

  async function update(id, project) {
    try {
      setLoading(true);
      const updated = await databases.updateDocument(
        PROJECT_DATABASE_ID,
        PROJECT_COLLECTION_ID,
        id,
        project,
      );

      setProjects((prev) => prev.map((p) => (p.$id === id ? updated : p)));
    } catch (error) {
      console.log("Error updating project", error);
    } finally {
      setLoading(false);
    }
  }

  async function init(userId) {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        PROJECT_DATABASE_ID,
        PROJECT_COLLECTION_ID,
        [
          Query.equal("userId", userId),
          Query.orderDesc("$createdAt"),
          Query.limit(10),
        ],
      );
      setProjects(response.documents);
    } catch (error) {
      console.log("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (current?.$id) {
      init(current.$id);
    }
  }, [current]);

  return (
    <ProjectContext.Provider
      value={{ projects, add, remove, update, init, loading }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
}
