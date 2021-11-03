import { useContext, useState } from "react";
import { Nav, Button, ButtonGroup } from "react-bootstrap";
import { authContext } from "../../providers/AuthProvider";
import { stateContext } from "../../providers/StateProvider";
import { FaUserFriends } from "react-icons/fa";
import ViewFavs from "./ViewFavs";


export default function LoginInfo() {
  const {user, logout} = useContext(authContext);
  const { state } = useContext(stateContext);
  const [userNumber, setUserNumber] = useState(0);  

  let fontColor = "";
  if (user.id === "1" ) fontColor = "red";
  if (user.id === "2" ) fontColor = "blue";

  if (state.socket) {
    state.socket.on('number-of-clients', (number) => {
      setUserNumber(number);
    });
  }

  return (
    <Nav className="top-bar-user">
      <div className="pt-2 mx-4"><FaUserFriends/> {userNumber}</div>    
      <span className="text-muted"> Welcome to Gameflix,</span><span id="user-name" style={{color:`${fontColor}`}}>{user.username}!</span>
      <ButtonGroup aria-label="Basic example">
        <ViewFavs/>
        <Button variant="danger" onClick={() => logout()}>Logout</Button>
      </ButtonGroup>
    </Nav>
  )
}