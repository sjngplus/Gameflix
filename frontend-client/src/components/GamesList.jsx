import axios from 'axios'
import { useEffect, useState } from "react"
import Game from './Game'


const GamesList = () => {

  const [results, setResults] = useState([])

  const parsedData = (results) => {
    results.map(game => {
      if (game) {
        console.log(game.name)
        return <Game name={game.name}/>
      }
    })
  }


  useEffect(() => {
    const url = `http://localhost:3001/api/search/games?title=batman&steamAppID=35140&limit=60&exact=0`
    axios.get(url)
    .then(res => {
      // console.log(res.data)
      setResults(res.data)   
    })
    .catch(err => console.log(err))    
  }, [])

  return (
    <div>
      Games List 
      {parsedData(results)}   
    </div>
  )
}

export default GamesList
