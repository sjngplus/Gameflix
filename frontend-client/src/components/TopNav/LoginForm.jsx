import { useContext, useState } from "react";
import { Form, NavDropdown, Button, Nav } from "react-bootstrap";

import { authContext } from "../../providers/AuthProvider";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(authContext);

  const onSubmit = event => {
    event.preventDefault();
    email && login(email, password);
  }

  return (
    <Nav className="top-bar-user">
      <span className="text-muted">
        Returning to Gameflix?
      </span>
      <NavDropdown className="login-dropdown-container" title="Login" align="end">
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
  </Nav>
  );
}