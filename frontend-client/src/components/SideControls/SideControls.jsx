import "./SideControls.scss"
import { Nav, Button, ButtonGroup } from 'react-bootstrap';
import NumericFilters from './NumericFilters';
import GenreFilters from "./GenreFilters";
import OSFilters from "./OSFilters";
import TitleSearch from "./TitleSearch";
import { useContext, useEffect } from "react";
import { stateContext } from "../../providers/StateProvider";
import { BsListNested, BsXLg } from "react-icons/bs";
import { FaSync, FaSave, FaUndoAlt } from "react-icons/fa";

export default function SideControls() {
  const { state } = useContext(stateContext);
  
  const handleSync = () => {
    if (state.socket) {
      state.socket.emit('filter-state', state.filters);
    }
  }

  return (
    <Nav className="flex-column bg-light side-controls">
      <h5 className="py-3 px-3"><BsListNested/> Set Filters</h5>
      <NumericFilters />
      <GenreFilters />
      <OSFilters />
      <TitleSearch />
      <ButtonGroup className="py-3 px-3">
        <Button className="btn btn-danger"><BsXLg/> Reset</Button>
        <Button variant="primary" onClick={handleSync}><FaSync/> Sync</Button>
      </ButtonGroup>
      <ButtonGroup className="px-3">
        <Button variant="success"><FaSave/> Save</Button>
        <Button variant="warning" style={{color: "white", backgroundColor: "goldenrod", borderColor: "goldenrod"}}><FaUndoAlt/> Load</Button>
      </ButtonGroup>
    </Nav>
  );
}


