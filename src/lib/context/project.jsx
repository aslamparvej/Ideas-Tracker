import { createContext, useContext, useState, useEffect } from "react";

import { ID, Query } from "appwrite";
import { databases } from "../appwrite";

const IDEAS_DATABASE_ID = `${import.meta.env.VITE_APPWRITE_IDEAS_DATABASE_ID}`;
const IDEAS_COLLECTION_ID = `${import.meta.env.VITE_APPWRITE_IDEAS_COLLECTION_ID}`;

const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider(props) {
  const [ideas, setIdeas] = useState([]);

  async function add(idea) {
    try {
      const response = await databases.createDocument(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        ID.unique(),
        idea
      );
      setIdeas((ideas) => [response.$id, ...ideas].slice(0, 10));
      await init();
      return response;
    } catch (error) {
      console.log("Error in Add an Idea", error);
      return null;
    }
  }

  async function remove(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
    setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
    await init();
  }

  async function update(id, idea) {
    alert("Work in Progress!");
  }

  async function init() {
    try {
      const response = await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      setIdeas(response.documents);
    } catch (error) {
      console.log("Error to fetch Ideas:", error.message);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove, update, init }}>
      {props.children}
    </IdeasContext.Provider>
  );
}
