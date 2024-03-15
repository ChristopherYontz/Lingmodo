import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase";
// import { isTokenExpired } from "pocketbase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(pb.authStore.model);

  const register = useCallback(async (email, password) => {
    return await pb
      .collection("users")
      .create({ email, password, passwordConfirm: password });
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      if (authData) {
        setUser(authData.record);
        console.log("logging in");
        navigate("/");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
    }
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear();
    navigate("/login", {replace: true})
  }, []);

  // useEffect(() => {
  //   return pb.authStore.onChange((token, model) => {
  //     setUser(model);
  //   });
  // }, []);

  useEffect(() => {
    const AuthListener = pb.authStore.onChange((token, model) => {
      if (pb.authStore.isValid) {
          setUser(model)
          navigate('/')
      } else {
        setUser(pb.authStore.model)
        navigate('/login')
      }
    })
    return () => AuthListener()
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
