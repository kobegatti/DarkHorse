import React, { useContext, useState } from "react";

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={value}></AuthContext.Provider>;
}
