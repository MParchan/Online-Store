import { createContext, useState } from "react";
import authService from "../api/authService";

const AuthContext = createContext({
  auth: false,
  setAuth: () => {},
});

export function AuthContextProvider(props) {
  const [authorize, setAuthorize] = useState(false);

  function setAuthHandler(isAuth) {
    setAuthorize(isAuth);
    authService.getCurrentUser();
  }

  const context = {
    auth: authorize,
    setAuth: setAuthHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
