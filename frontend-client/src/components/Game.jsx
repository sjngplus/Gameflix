import ReactTooltip from 'react-tooltip';
const Game = (props) => {
  return (
    <div data-tip="React-tooltip">
      {/* {props.name} || Price: {props.price}
      <p>Genres: {props.genre}</p> */}
      <ReactTooltip place="top" type="dark" effect="float"/>
    </div>
  )
}

export default Game
