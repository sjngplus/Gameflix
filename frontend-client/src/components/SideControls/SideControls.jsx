import "./SideControls.scss"
import { Nav, Button, ButtonGroup } from 'react-bootstrap';
import NumericFilters from './NumericFilters';
import GenreFilters from "./GenreFilters";
import OSFilters from "./OSFilters";
import TitleSearch from "./TitleSearch";
import { useContext } from "react";
import { stateContext } from "../../providers/StateProvider";

export default function SideControls() {
  const { state } = useContext(stateContext);

  return (
    <Nav className="flex-column bg-light side-controls">
      <h5>Filters</h5>
      <NumericFilters />
      <GenreFilters />
      <OSFilters />
      <TitleSearch />
      <ButtonGroup>
        <Button className="btn btn-danger">Reset</Button>
        <Button variant="secondary">Save</Button>
        <Button variant="secondary">Sync</Button>
      </ButtonGroup>
    </Nav>
  );
}


