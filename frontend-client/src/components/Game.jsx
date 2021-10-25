
const Game = (props) => {
  // console.log(props)
  return (
    <div>
      {props.name} || Price: {props.price}
      <p>Genres: {props.genre}</p>
    </div>
  )
}

export default Game
