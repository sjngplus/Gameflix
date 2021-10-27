import "./SideControls.scss"
import { Nav, Button } from 'react-bootstrap';
import NumericFilters from './NumericFilters';
import GenreFilters from "./GenreFilters";
import OSFilters from "./OSFilters";
import TitleSearch from "./TitleSearch";
import useAppData from "../../hooks/useAppData";

function SideControls() {
  const { state } = useAppData();

  return (
    <Nav className="flex-column bg-light side-controls">
      <h5>Filters</h5>
      <NumericFilters />
      <GenreFilters />
      <OSFilters />
      <TitleSearch />
      <Button onClick={e => console.log(state.filters)}>Fetch Game Data</Button>
      <Button className="btn btn-danger">Reset Filters</Button>
    </Nav>
  );
}

export default SideControls;
