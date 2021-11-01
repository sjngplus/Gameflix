import { useContext } from "react";
import { Navbar, Figure } from "react-bootstrap";
import { authContext } from "../../providers/AuthProvider";
import LoginForm from "./LoginForm";
import LoginInfo from "./LoginInfo";
import UserDataControls from "./UserDataControls/UserDataControls";
import "./TopNav.scss";

export default function TopNav() {
  const { user } = useContext(authContext);

  return (
    <Navbar className="top-bar" bg="light" expand="sm">
      <Navbar.Brand>        
        <Figure className="mb-0">
          <Figure.Image
            className="mb-0"
            width={50}
            height={10}
            src="/Gameflix-icon.png"
          /> 
        </Figure>      
        <span className="app-title">GameFlix</span>
      </Navbar.Brand>
      <span>
        {user ? <LoginInfo /> : <LoginForm />}
      </span>
    </Navbar>
  );
}



