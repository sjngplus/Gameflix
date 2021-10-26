import "./NumericFilters.scss";

import {Accordion, Form } from 'react-bootstrap';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useReducer } from 'react';

import { priceFormat } from '../../helpers/helpers';

const defaultFilters = {
  centPrices: [0, 19999],
  rating: [0, 100],
  years: [1980, 2021]
}

const SET_PRICES = "SET_PRICES";
const SET_RATINGS = "SET_RATINGS";
const SET_YEARS = "SET_YEARS";

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

function NumericFilters() {
  const [filters, dispatch] = useReducer(reducer, defaultFilters);

  const setPrices = prices => dispatch({type: SET_PRICES, value: prices});
  const setRatings = ratings => dispatch({type: SET_RATINGS, value: ratings});
  const setYears = years => dispatch({type: SET_YEARS, value: years});

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Numeric Filters</Accordion.Header>
        <Accordion.Body>
        <Form>
          <div class="filter-setting">
            <Form.Label>Price</Form.Label>
            <Form.Check type="switch" id="on-sale" label="On Sale Only" className="text-secondary"/>
            <div class="filter-numberic-labels">
              <Form.Text>{priceFormat(filters.centPrices[0])}</Form.Text>
              <Form.Text>{priceFormat(filters.centPrices[1])}</Form.Text>
            </div>
            <Range
              min={defaultFilters.centPrices[0]}
              max={defaultFilters.centPrices[1]}
              value={filters.centPrices}
              onChange = {setPrices}
            />
          </div>
          <div class="filter-setting">
            <Form.Label>Metacritic Rating</Form.Label>
            <div class="filter-numberic-labels">
              <Form.Text>{filters.rating[0]}</Form.Text>
              <Form.Text>{filters.rating[1]}</Form.Text>
            </div>
            <Range
              min={defaultFilters.rating[0]}
              max={defaultFilters.rating[1]}
              value={filters.rating}
              onChange = {setRatings}
            />
          </div>
          <div class="filter-setting">
            <Form.Label>Release Year</Form.Label>
            <div class="filter-numberic-labels">
              <Form.Text>{filters.years[0]}</Form.Text>
              <Form.Text>{filters.years[1]}</Form.Text>
            </div>
            <Range
              min={defaultFilters.years[0]}
              max={defaultFilters.years[1]}
              value={filters.years}
              step={1}
              onChange = {setYears}
            />
          </div>

        </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default NumericFilters;
