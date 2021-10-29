import "./TopNav.scss"
import { Form, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { useContext, useState } from "react";

export default function TopNav() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login } = useContext(authContext);

  const onSubmit = event => {
    event.preventDefault();
    // email && login(email, password);
  }

  return (
    <Navbar className="top-bar" bg="light" expand="lg">
      <Navbar.Brand className="logo">Gameflix</Navbar.Brand>
      <NavDropdown title="Login" align="end">
        <Form className="login-dropdown-form" onSubmit={onSubmit}>
          <Form.Control
            type="email"
            placeholder="Email address"
            value={email}
            onChange={event => setEmail(event.target.value)}
            />
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Button variant="success" type="submit">
            Login
          </Button>
        </Form>
      </NavDropdown>
    </Navbar>
  );
}