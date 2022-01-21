import React, { useContext, useState } from "react";
import { auth } from "../config/firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthContext(children) {
  const [currentUser, setCurrentUser] = useState();

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
