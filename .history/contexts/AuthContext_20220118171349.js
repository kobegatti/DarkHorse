import React, { useContext } from "react";

const AuthContext = React.createContext();

export default function AuthContext(children) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}
