import {Accordion, Form } from 'react-bootstrap';

const systemsList = ["Windows", "Mac", "Linux"];

function OSFilters() {
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
