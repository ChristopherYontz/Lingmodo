import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase";
// import { isTokenExpired } from "pocketbase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(username, password);
      if (authData) {
        setUser(authData.record);
        navigate("/");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    console.log('Here is the user object:', user)

    navigate("/login", {replace: true}); // Redirect to login page after logout
  };

  useEffect(() => {
    const AuthListener = pb.authStore.onChange((token, model) => {
      if (token && model) {
        setUser(model)
        console.log('Here is the user object:', user)
        navigate('/')
      } else {
        setUser(null)
        navigate('/login')
      }
    })
    return () => AuthListener()
  }, []);

  // useEffect(() => {
  //   const AuthListener = pb.authStore.onChange((token, model) => {
  //     if (token && model) {
  //       if (!isTokenExpired(token)) {
  //         setUser(model)
  //         navigate('/')
  //       }
  //     } else {
  //       setUser(null)
  //       navigate('/login')
  //     }
  //   })
  //   return () => AuthListener()
  // }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};