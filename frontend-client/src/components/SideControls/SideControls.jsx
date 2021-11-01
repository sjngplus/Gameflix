import "./SideControls.scss"
import { Nav, Button, ButtonGroup } from 'react-bootstrap';
import NumericFilters from './NumericFilters';
import GenreFilters from "./GenreFilters";
import OSFilters from "./OSFilters";
import TitleSearch from "./TitleSearch";
import { useContext } from "react";
import { stateContext } from "../../providers/StateProvider";
import { BsListNested, BsXLg } from "react-icons/bs";
import { FaSync, FaSave, FaUndoAlt } from "react-icons/fa";
import LoadFilters from "./LoadFilters";
import SaveFilters from "./SaveFilters";


export default function SideControls() {
  const { state, setOSFilter, setGenreFilter, setNumericFilters, setNameFilter } = useContext(stateContext);
  const { setPrices, setRatings, setYears } = setNumericFilters;

  const defaultFilters = {
    centPrices: [state.defaultValues.PRICEFLOOR, state.defaultValues.PRICECEILING],
    rating: [state.defaultValues.RATINGFLOOR, state.defaultValues.RATINGCEILING],
    years: [state.defaultValues.YEARFLOOR, state.defaultValues.YEARCEILING],
    name: "",
    genres: {
      Action: false,
      Adventure: false,
      RPG: false,
      Strategy: false,
      Simulation: false
    },
    os: {
      windows: false,
      mac: false,
      linux: false
    }
  }

  
  const handleSync = () => {
    if (state.socket) {
      state.socket.emit('filter-state', state.filters);
    }
  };

  const handleReset = () => {
    setOSFilter(defaultFilters.os);
    setGenreFilter(defaultFilters.genres);
    setPrices(defaultFilters.centPrices);
    setRatings(defaultFilters.rating);
    setYears(defaultFilters.years);
    setNameFilter("");
  };

  return (
    <Nav className="flex-column bg-light side-controls">
      <h5 className="py-3 px-3"><BsListNested/> Set Filters</h5>
      <NumericFilters />
      <GenreFilters />
      <OSFilters />
      <TitleSearch />
      <ButtonGroup className="py-3 px-3">
        <Button className="btn btn-danger" onClick={handleReset}><BsXLg/> Reset</Button>
        <Button variant="primary" onClick={handleSync}><FaSync/> Sync</Button>
      </ButtonGroup>
      <ButtonGroup className="px-3">
        <SaveFilters />
        <LoadFilters />
      </ButtonGroup>
    </Nav>
  );
}


