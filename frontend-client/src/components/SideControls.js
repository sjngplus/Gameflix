import "./SideControls.scss"
import { Nav, Button } from 'react-bootstrap';
import NumericFilters from './NumericFilters';
import GenreFilters from "./GenreFilters";
import OSFilters from "./OSFilters";

function SideControls() {
  return (
    <Nav className="flex-column bg-light side-controls" flush>
      <h5>Filters</h5>
      <NumericFilters />
      <GenreFilters />
      <OSFilters />
      <Button className="btn btn-danger">Reset Filters</Button>
    </Nav>
  );
}

export default SideControls;
