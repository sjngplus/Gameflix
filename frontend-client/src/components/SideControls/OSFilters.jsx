import { useContext } from 'react';
import {Accordion, Form } from 'react-bootstrap';

import { stateContext } from '../../providers/StateProvider';

const systemsList = ["Windows", "Mac", "Linux"];

export default function OSFilters() {
  const { state, setOSFilter } = useContext(stateContext);
  const { os } = state.filters;

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Operating Systems</Accordion.Header>
        <Accordion.Body>
          <Form>
            {systemsList.map( system => {
              return (
                <div key={`${system}`}>
                  <Form.Check
                    type="checkbox"
                    id={`${system}`}
                    label={`${system}`}
                    checked={os.system}
                    onChange={event => setOSFilter({[`${system}`]: event.target.checked})}
                  />
                </div>
               )
            })}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}