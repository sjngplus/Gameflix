import { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { authContext } from "../../providers/AuthProvider";
import LoginForm from "./LoginForm";
import LoginInfo from "./LoginInfo";

import "./TopNav.scss"

export default function TopNav() {
  const { user } = useContext(authContext);

  return (
    <Navbar className="top-bar" bg="light" expand="sm">
      <Navbar.Brand className="logo">Gameflix</Navbar.Brand>
      {user ? <LoginInfo /> : <LoginForm />}
    </Navbar>
  );
}