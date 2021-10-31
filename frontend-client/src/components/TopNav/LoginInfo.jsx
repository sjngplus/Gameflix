import { useContext } from "react";
import { Nav, Button } from "react-bootstrap";
import { authContext } from "../../providers/AuthProvider";

export default function LoginInfo() {
  const {user, logout} = useContext(authContext);

  // style={{color:`${fontColor}`}}

  let fontColor = "";
  if (user.id == 1 ) fontColor = "red";
  if (user.id == 2 ) fontColor = "blue";
  return (
    <Nav className="top-bar-user">
      <span className="text-muted">Welcome to Gameflix,</span><span id="user-name" style={{color:`${fontColor}`}}>{user.username}!</span>
      <Button variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </Nav>
  )
}