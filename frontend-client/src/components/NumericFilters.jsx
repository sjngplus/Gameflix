import {Accordion, Form } from 'react-bootstrap';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useReducer } from 'react';

const defaultFilters = {
  dates: [Date(0), Date.now()]
}

function NumericFilters() {
  const [filters, dispatch] = useReducer(reducer, defaultFilters);

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Numeric Filters</Accordion.Header>
        <Accordion.Body>
        <Form>
          <Form.Check type="checkbox" id="on-sale" label="On Sale Only" />
          <Form.Label>Price</Form.Label>
          <Range />
          <Form.Label>Metacritic Rating</Form.Label>
          <Range />
          <Form.Label>Release Date</Form.Label>
          <Range />

        </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default NumericFilters;
