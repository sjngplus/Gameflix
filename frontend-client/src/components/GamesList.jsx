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

  const filterGamesListArray = (inputList, filters) => {
    console.log(filters)
    const filteredByPrice = filterByPrice(inputList, filters.centPrices);
    const filteredByRating = filterByRating(filteredByPrice, filters.rating);
    const filteredByYear = filterByYear(filteredByRating, filters.years);
    console.log(inputList.length);
    return filteredByYear;
  } 

  const filterByPrice = (inputArray, priceFilter) => {
    const outputArray = [];
    inputArray.forEach(game => {
      if (game.price_overview && game.price_overview.final >= priceFilter[0] && game.price_overview.final <= priceFilter[1]) {
        outputArray.push(game)
      }
    });
    return outputArray
  };

  const filterByRating = (inputArray, ratingFilter) => {
    const outputArray = [];
    inputArray.forEach(game => {
      if (game.metacritic && game.metacritic.score >= ratingFilter[0] && game.metacritic.score <= ratingFilter[1]) {
        outputArray.push(game)
      }
    });
    return outputArray
  };

  const filterByYear = (inputArray, yearFilter) => {
    const outputArray = [];
    inputArray.forEach(game => {
      if (game.release_date && game.release_date.date.slice(-4) >= yearFilter[0] && game.release_date.date.slice(-4) <= yearFilter[1]) {
        outputArray.push(game)
      }
    });
    return outputArray
  };
  

  
  
  useEffect(() => {
    const nameSearch = "tales";
    const searchLimit = 10;
    const lowerPrice = 1;
    const upperPrice = 100;
    // const url = `http://localhost:3001/api/search/games?title=${nameSearch}&limit=${searchLimit}&lowerPrice=${lowerPrice}&upperPrice=${upperPrice}`
    const url = `http://localhost:3001/api/search/deals`
    axios.get(url)
    .then(res => {
      // console.log(res.data)
      const GAMESLISTARRAY = [...res.data];
      const filteredArray = filterGamesListArray(GAMESLISTARRAY, state.filters);
      setGames(filteredArray);   
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
