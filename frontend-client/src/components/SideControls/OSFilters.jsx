import {Accordion, Form } from 'react-bootstrap';

import useAppData from '../../hooks/useAppData';

const systemsList = ["Windows", "Mac", "Linux"];

function OSFilters() {
  const { state, setOSFilter } = useAppData();
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

export default OSFilters;
