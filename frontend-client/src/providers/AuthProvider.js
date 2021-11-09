import axios from 'axios';
import { createContext, useState } from 'react';

export const authContext = createContext();

const retrieveSessionStorage = () => {
  const id = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");
  return (id && username && {id, username})
}

export default function AuthProvider(props) {
  const [user, setUser] = useState(retrieveSessionStorage() || null);

  const login = function(email, password) {
    axios.post("https://gameflix-backend-server.herokuapp.com/login", {...{email, password}})
      .then( res => {
        Object.entries(res.data).forEach(userInfo => {
          sessionStorage.setItem(...userInfo);
        })
        setUser(retrieveSessionStorage())
      })
  };

  const logout = function () {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    setUser(null);
  };

  const userData = { user, login, logout };

  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
};