import { createContext, useState } from "react";

const AuthContext = createContext({
  auth: false,
  setAuth: () => {},
});

export function AuthContextProvider(props) {
  const [authorize, setAuthorize] = useState(false);

  function setAuthHandler(isAuth) {
    setAuthorize(isAuth);
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
