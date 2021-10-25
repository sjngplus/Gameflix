import {Accordion, Form } from 'react-bootstrap';

function TitleSearch() {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Search</Accordion.Header>
        <Accordion.Body>
        <Form>
          <Form.Group controlId="gameTitle">
            <Form.Control type="text" placeholder="Search by game name"/>
          </Form.Group>

        </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TitleSearch;
