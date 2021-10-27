import {Accordion, Form } from 'react-bootstrap';

import useAppData from '../../hooks/useAppData';

const genreList = ["Action", "Adventure", "RPG", "Strategy", "Simulation"];

function GenreFilters() {
  const { state, setGenreFilter } = useAppData();
  const { genres } = state.filters;

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Genres</Accordion.Header>
        <Accordion.Body>
          <Form>
            {genreList.map( genre => {
              return (
                <div key={`${genre}`}>
                  <Form.Check
                    type="checkbox"
                    id={`${genre}`}
                    label={`${genre}`}
                    checked={genres.genre}
                    onChange={event => setGenreFilter({[`${genre}`]: event.target.checked})}
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
