import { createContext } from "react";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [userData, setUserData] = useState(null);
  let saveUserData = () => {
    let encodeToken = localStorage.getItem("token");
    let decodeToken = jwtDecode(encodeToken);
    console.log(decodeToken);
    setUserData(decodeToken);
  };
  let logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    return <Navigate to="login" />;
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, saveUserData, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
