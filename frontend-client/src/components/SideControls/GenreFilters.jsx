import { useContext } from 'react';
import {Accordion, Form } from 'react-bootstrap';

import { stateContext } from '../../providers/StateProvider';

const genreList = ["Action", "Adventure", "RPG", "Strategy", "Simulation"];

export default function GenreFilters() {
  const { state, setGenreFilter } = useContext(stateContext);
  const { genres } = state.filters;
  console.log(state.filters.genres)

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