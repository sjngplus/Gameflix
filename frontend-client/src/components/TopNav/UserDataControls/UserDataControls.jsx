import { Nav, NavDropdown } from "react-bootstrap";
import LoadFilters from "./LoadFilters";
import SaveFilters from "./SaveFilters";
import "./UserDataControls.scss";
import ViewFavs from "./ViewFavs";

export default function UserDataControls() {
  return (
    <Nav variant="tabs" className="user-data-controls">
      <NavDropdown title="Filters" disabled>
        <SaveFilters />
        <LoadFilters />
        <NavDropdown.Divider />
        <NavDropdown.Item disabled>Sync Filters</NavDropdown.Item>
      </NavDropdown>
      <ViewFavs />
      <NavDropdown title="Favorites">
        <NavDropdown.Item disabled>Highlight Favorites</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  )
}