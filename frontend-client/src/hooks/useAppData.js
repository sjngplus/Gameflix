import { useReducer } from 'react';

const defaultFilters = {
  centPrices: [0, 19999],
  rating: [0, 100],
  years: [2011, 2021]
}

const SET_PRICES = "SET_PRICES";
const SET_RATINGS = "SET_RATINGS";
const SET_YEARS = "SET_YEARS";

export default function useAppData() {
  const [state, dispatch] = useReducer(reducer, { filters: defaultFilters });

  const setPrices = prices => dispatch({type: SET_PRICES, value: prices});
  const setRatings = ratings => dispatch({type: SET_RATINGS, value: ratings});
  const setYears = years => dispatch({type: SET_YEARS, value: years});

  function reducer(state, action) {
    switch (action.type) {
      case SET_PRICES:
        return {...state, filters: {...state.filters, centPrices: action.value}}
      case SET_RATINGS:
        return {...state, filters: {...state.filters, rating: action.value}}
      case SET_YEARS:
        return {...state, filters: {...state.filters, years: action.value}}
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  return {
    state,
    setNumericFilters: {setPrices, setRatings, setYears}
  };
}