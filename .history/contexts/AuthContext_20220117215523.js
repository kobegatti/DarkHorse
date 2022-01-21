import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={value}></AuthContext.Provider>;
}
