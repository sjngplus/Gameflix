import { createContext, useReducer } from 'react';

const defaultFilters = {
  centPrices: [0, 19999],
  rating: [0, 100],
  years: [2001, 2021],
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

const SET_PRICES = "SET_PRICES";
const SET_RATINGS = "SET_RATINGS";
const SET_YEARS = "SET_YEARS";
const SET_GENRES = "SET_GENRES";
const SET_OS = "SET_OS";
const SET_GAMESLIST = "SET_GAMESLIST";
const SET_NAME = "SET_NAME";
const SET_SEARCH = "SET_SEARCH";

export const stateContext = createContext();

export default function StateProvider(props) {
  const [state, dispatch] = useReducer(reducer,
    {
      gamesList: [],
      filters: {...defaultFilters},
      buttonToggles: {
        search: false,
        reset: false
      }
    }
  );

  const setGamesList = list => dispatch({type: SET_GAMESLIST, value: list});
  const setPrices = prices => dispatch({type: SET_PRICES, value: prices});
  const setRatings = ratings => dispatch({type: SET_RATINGS, value: ratings});
  const setYears = years => dispatch({type: SET_YEARS, value: years});  
  const setGenreFilter = genre => { dispatch({type: SET_GENRES, value: genre}) };
  const setOSFilter = OS => dispatch({type: SET_OS, value: OS});
  const setNameFilter = name => dispatch({type: SET_NAME, value:name});
  const setSearchToggle = () => dispatch({type: SET_SEARCH});

  function reducer(state, action) {
    switch (action.type) {
      case SET_GAMESLIST:
        return {...state, gamesList: [...action.value]}
      case SET_PRICES:
        return {...state, filters: {...state.filters, centPrices: action.value}}
      case SET_RATINGS:
        return {...state, filters: {...state.filters, rating: action.value}}
      case SET_YEARS:
        return {...state, filters: {...state.filters, years: action.value}}
      case SET_GENRES:
        return {...state, filters: {...state.filters, genres: {...state.filters.genres, ...action.value}}}
      case SET_OS:
        return {...state, filters: {...state.filters, os: {...state.filters.os, ...action.value}}}
      case SET_NAME:
        return {...state, filters: {...state.filters, name: action.value}}
      case SET_SEARCH:
        return {...state, buttonToggles: {...state.buttonToggles, search: !state.buttonToggles.search}}
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const providerData = {
    state,
    setGamesList,
    setNumericFilters: {setPrices, setRatings, setYears},
    setGenreFilter,
    setOSFilter,
    setNameFilter,
    setSearchToggle
  };

  return (
    <stateContext.Provider value={providerData}>
      {props.children}
    </stateContext.Provider>
  );
}