import { Nav, NavDropdown } from "react-bootstrap";
import "./UserDataControls.scss";

export default function UserDataControls() {
  return (
    <Nav variant="tabs" className="user-data-controls">
      <NavDropdown title="Filters">
        <NavDropdown.Item>Save Filters</NavDropdown.Item>
        <NavDropdown.Item>Load Filters</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Sync Filters</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Favorites">
        <NavDropdown.Item>View Favorites</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Highlight Favorites</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  )
}