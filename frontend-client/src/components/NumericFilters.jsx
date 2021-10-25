import {Accordion, Form } from 'react-bootstrap';

function NumericFilters() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Numeric Filters</Accordion.Header>
        <Accordion.Body>
        <Form>
          <Form.Check type="checkbox" id="on-sale" label="On Sale Only" />
          <Form.Label>Price</Form.Label>
          <Form.Range />
          <Form.Label>Metacritic Rating</Form.Label>
          <Form.Range />
          <Form.Label>Release Date</Form.Label>
          <Form.Range />

        </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default NumericFilters;