import { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { authContext } from "../../providers/AuthProvider";
import LoginForm from "./LoginForm";
import LoginInfo from "./LoginInfo";

import "./TopNav.scss"

export default function TopNav() {
  const { auth } = useContext(authContext);

  return (
    <Navbar className="top-bar" bg="light" expand="lg">
      <Navbar.Brand className="logo">Gameflix</Navbar.Brand>
      {auth ? <LoginInfo /> : <LoginForm />}
    </Navbar>
  );
}