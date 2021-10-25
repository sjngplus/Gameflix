import axios from 'axios'
import { useEffect, useState } from "react"
import Game from './Game'


const GamesList = () => {

  const [results, setResults] = useState([])

  const parsedGameInfo = results.map(game => {          
    return <Game 
      key={game.steam_appid} 
      name={game.name}
    />
  })  


  useEffect(() => {
    const nameSearch = "batman";
    const searchLimit = 10;
    const url = `http://localhost:3001/api/search/games?title=${nameSearch}&steamAppID=35140&limit=${searchLimit}&exact=0`
    axios.get(url)
    .then(res => {
      // console.log(res.data)
      const resData = [];
      res.data.forEach(el => {
        if (el) resData.push(el)
      })
      setResults(resData)      
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
