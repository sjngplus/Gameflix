import {Accordion, Form, Button, InputGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { stateContext } from '../../providers/StateProvider';
import { FaSearch } from "react-icons/fa";

function TitleSearch() {

  const { state, setNameFilter, setSearchToggle } = useContext(stateContext);

  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Search</Accordion.Header>
        <Accordion.Body>
        <InputGroup size="md">          
          <Form.Control 
          type="text" 
          placeholder="Title Search" 
          value={state.filters.name}
          onChange={e => setNameFilter(e.target.value)}
          />          
          <Button variant="secondary" id="button-addon2" onClick={e => setSearchToggle()}><FaSearch /></Button>         
        </InputGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TitleSearch;