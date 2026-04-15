import { createContext, useContext, useState, useEffect } from "react";
import { ID } from "appwrite";

import { account } from "../appwrite";

// Create user context
const userContext = createContext();

// Custom hook to use userContext
export function useUser() {
  return useContext(userContext);
}

// Create context provider
export function UserProvider(props) {
  // User state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, passsword) {
    try {
      const loggedIn = await account.createEmailSession(email, passsword);
      setUser(loggedIn);
      await init();
      return loggedIn;
    } catch (error) {
      console.log("Something is wrong to login", error);
      return false;
    }
  }

  async function logout() {
    try {
      const logouted = await account.deleteSession("current");
      setUser(null);
      return logouted;
    } catch (error) {
      console.log("Something is wrong to logout", error);
      return null;
    }
  }

  async function register(email, passsword, name) {
    try {
      const userLogin =  await account.create(ID.unique(), email, passsword, name);
      await login(email, passsword);
      return userLogin;
    } catch (error) {
        console.log("Something is wrong to register an user", error);
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <userContext.Provider value={{ current: user, loading, login, logout, register }}>
      {props.children}
    </userContext.Provider>
  );
}
