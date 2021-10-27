import "./TopNav.scss"
import { Navbar } from 'react-bootstrap';

export default function TopNav() {
  return (
    <Navbar className="top-bar" bg="light">
      <Navbar.Brand className="logo">Gameflix</Navbar.Brand>
    </Navbar>
  );
}