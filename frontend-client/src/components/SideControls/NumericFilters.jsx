import "./NumericFilters.scss";

import {Accordion, Form } from 'react-bootstrap';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import useAppData from "../../hooks/useAppData";
import { priceFormat } from '../../helpers/helpers';

function NumericFilters() {
  const { state, setNumericFilters } = useAppData();
  const { filters } = state;
  const { setPrices, setRatings, setYears } = setNumericFilters;

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
              min={0}
              max={19999}
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
              min={0}
              max={100}
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
              min={1980}
              max={2021}
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
