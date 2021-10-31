import {Accordion, Form, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { stateContext } from '../../providers/StateProvider';

function TitleSearch() {

  const { state, setNameFilter } = useContext(stateContext);

  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Search</Accordion.Header>
        <Accordion.Body>
        <Form>
          <Form.Group controlId="gameTitle">
            <Form.Control 
            type="text" 
            placeholder="Search by game name" 
            value={state.filters.name}
            onChange={e => setNameFilter(e.target.value)}
            />            
          </Form.Group>
        </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TitleSearch;
