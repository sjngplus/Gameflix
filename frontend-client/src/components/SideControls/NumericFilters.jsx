import { useContext } from "react";
import {Accordion, Form } from 'react-bootstrap';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import "./NumericFilters.scss";

import { stateContext } from "../../providers/StateProvider";
import { priceFormat } from '../../helpers/helpers';

export default function NumericFilters() {
  const { state, setNumericFilters } = useContext(stateContext);
  const { centPrices, rating, years } = state.filters;
  const { setPrices, setRatings, setYears } = setNumericFilters;

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Numeric Filters</Accordion.Header>
        <Accordion.Body>
        <Form>
          <div className="filter-setting">
            <Form.Label>Price</Form.Label>
            <Form.Check type="switch" id="on-sale" label="On Sale Only" className="text-secondary"/>
            <div className="filter-numberic-labels">
              <Form.Text>{priceFormat(centPrices[0])}</Form.Text>
              <Form.Text>{priceFormat(centPrices[1])}</Form.Text>
            </div>
            <Range
              min={0}
              max={19999}
              value={centPrices}
              onChange = {setPrices}
            />
          </div>
          <div className="filter-setting">
            <Form.Label>Metacritic Rating</Form.Label>
            <div className="filter-numberic-labels">
              <Form.Text>{rating[0]}</Form.Text>
              <Form.Text>{rating[1]}</Form.Text>
            </div>
            <Range
              min={0}
              max={100}
              value={rating}
              onChange = {setRatings}
            />
          </div>
          <div className="filter-setting">
            <Form.Label>Release Year</Form.Label>
            <div className="filter-numberic-labels">
              <Form.Text>{years[0]}</Form.Text>
              <Form.Text>{years[1]}</Form.Text>
            </div>
            <Range
              min={1980}
              max={2021}
              value={years}
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