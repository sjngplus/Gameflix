import {Accordion, Form } from 'react-bootstrap';

const genres = ["Action", "Adventure", "RPG", "Strategy", "Simulation"];

function GenreFilters() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Genres</Accordion.Header>
        <Accordion.Body>
          <Form>
            {genres.map( genre => {
              return (
                <div key={`${genre}`}>
                  <Form.Check
                    type="checkbox"
                    id={`${genre}`}
                    label={`${genre}`}
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

export default GenreFilters;
