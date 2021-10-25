import axios from 'axios'
import { useEffect, useState } from "react"
import Game from './Game'


const GamesList = () => {

  const [results, setResults] = useState([])

  const parsedGameInfo = results.map(game => {          
    return <Game 
      key={game.steam_appid} 
      name={game.name}
      price={game.price_overview.final_formatted}
    />
  })  


  useEffect(() => {
    const nameSearch = "batman";
    const searchLimit = 5;
    const lowerPrice = 10;
    const upperPrice = 60;
    const url = `http://localhost:3001/api/search/games?title=${nameSearch}&limit=${searchLimit}&lowerPrice=${lowerPrice}&upperPrice=${upperPrice}`
    axios.get(url)
    .then(res => {
      // console.log(res.data)      
      setResults(res.data)      
    })
    .catch(err => console.log(err))    
  }, [])

  return (
    <div>
      <h5>Games List</h5>
      {parsedGameInfo}      
    </div>
  )
}

export default GamesList
