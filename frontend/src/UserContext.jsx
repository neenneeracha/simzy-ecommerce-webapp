import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import styled from "styled-components";
import Loading from "./user/components/Loading";

const UserContext = createContext();
const UserUpdateContext = createContext();

export const useUser = () => useContext(UserContext);
export const useUserUpdate = () => useContext(UserUpdateContext);

const Container = styled.div``;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true)
      const token = Cookie.get("accessToken");
      if (!token) setUser(null);

      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/verifyUser",
          { token: token }
        );
        setUser(res.data);
      } catch (error) {
        Cookie.remove("accessToken", { path: "" });
        setUser(null);
      }
      setLoading(false)
    };
    verifyUser();
  }, []);

  const setToken = (user) => {
    if (user.accessToken) {
      Cookie.set("accessToken", user.accessToken, {
        path: "/",
        expires: 6 / 24,
      });
    }
    setUser(user);
  };

  const removeToken = () => {
    Cookie.remove("accessToken", { path: "" });
    Cookie.remove("orderID", { path: "" });
    setUser(null);
  };

  const setFontSize = (fontSize) => {
    Cookie.set("fontSize", fontSize, {
      path: "/",
      expires: 6 / 24,
    });
  }

  return (
    <Container>
      {
        loading ? <Loading loading={loading}/> :
        <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={{ setToken, removeToken, setFontSize }}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
      }
    </Container>
  );
};
