import { useContext } from "react";
import { Nav, Button } from "react-bootstrap";
import { authContext } from "../../providers/AuthProvider";

export default function LoginInfo() {
  const {user, logout} = useContext(authContext);

  return (
    <Nav className="top-bar-user">
      <span className="text-muted">Welcome to Gameflix, {user.username}!</span>
      <Button variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </Nav>
  )
}