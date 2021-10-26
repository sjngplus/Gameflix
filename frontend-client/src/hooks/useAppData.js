const defaultFilters = {
  centPrices: [0, 19999],
  rating: [0, 100],
  years: [1980, 2021]
}

const SET_PRICES = "SET_PRICES";
const SET_RATINGS = "SET_RATINGS";
const SET_YEARS = "SET_YEARS";

export default function useAppData() {
  

  function reducer(state, action) {
    switch (action.type) {
      case SET_PRICES:
        return {...state, centPrices: action.value}
      case SET_RATINGS:
        return {...state, rating: action.value}
      case SET_YEARS:
        return {...state, years: action.value}
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
}