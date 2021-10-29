import axios from 'axios';
import { createContext, useState } from 'react';

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const login = function(email, password) {
    axios.post("http://localhost:3001/login", {...{email, password}})
      .then( res => {
        setUser(res.data);
      })
    setAuth(true);
  };

  const logout = function () {
    setUser(null);
    setAuth(false);
  };

  // authContext will expose these items
  const userData = { auth, username: user?.username, login, logout };

  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};