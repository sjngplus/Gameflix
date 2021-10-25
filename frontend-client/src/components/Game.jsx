
const Game = (props) => {
  console.log(props)
  return (
    <div>
      <h5>A Game</h5>
      {props.name}
    </div>
  )
}

export default Game
