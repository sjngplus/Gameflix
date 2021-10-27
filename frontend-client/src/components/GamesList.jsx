import axios from 'axios'
import { useEffect, useState } from "react"
import Game from './Game'
import useAppData from '../hooks/useAppData';


const GamesList = () => {

  const { state, games, setGames } = useAppData();

  const parsedGameInfo = games.map(game => {
    const genresArray = game.genres.map(genre => ` ${genre.description}`)
    return <Game 
      key={game.steam_appid} 
      name={game.name}
      price={game.price_overview.final_formatted}
      genre={genresArray}
    />
  }) 

  const filterGames = () => {
    
  }

  useEffect(() => {
    console.log(state.filters);
    const nameSearch = "tales";
    const searchLimit = 10;
    const lowerPrice = 1;
    const upperPrice = 100;
    // const url = `http://localhost:3001/api/search/games?title=${nameSearch}&limit=${searchLimit}&lowerPrice=${lowerPrice}&upperPrice=${upperPrice}`
    const url = `http://localhost:3001/api/search/deals`
    axios.get(url)
    .then(res => {
      // console.log(res.data)      
      setGames(res.data)      
    })
    .catch(err => console.log(err))    
  }, []);



  return (
    <div>
      <h5>Games List</h5>
      {parsedGameInfo}      
    </div>
  )
}

export default GamesList
