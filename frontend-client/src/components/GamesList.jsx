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
    const filteredByGenre = filterByGenre(filteredByYear, genreFilterTest)
    console.log(inputList.length);
    return filteredByGenre;
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

  const genreFilterTest = {
    Action: true,
    Adventure: true,
    RPG: false,
    Strategy: false,
    Simulation: false
  }
  
  const filterByGenre = (inputArray, genreFilter) => {
    console.log(genreFilter);
    const outputArray = [...inputArray];
    if (!genreFilter.Action && !genreFilter.Adventure && !genreFilter.RPG && !genreFilter.Strategy && !genreFilter.Simulation) return outputArray;
    outputArray.forEach((game, index) => {
      if (genreFilter.Action && isItemNotInArray(game.genres, "Action")) outputArray.splice(index, 1);
      if (genreFilter.Adventure && isItemNotInArray(game.genres, "Adventure")) outputArray.splice(index, 1);
      if (genreFilter.RPG && isItemNotInArray(game.genres, "RPG") && !outputArray.includes(game)) outputArray.push(game);
      if (genreFilter.Strategy && isItemNotInArray(game.genres, "Strategy") && !outputArray.includes(game)) outputArray.push(game);
      if (genreFilter.Simulation && isItemNotInArray(game.genres, "Simulation") && !outputArray.includes(game)) outputArray.push(game);
    })
    
    return outputArray;
  };

  const isItemNotInArray = (array, item) => {
    let result = true;
    array.forEach(el => {
      if (el.description === item) result = false;
    })
    return result;
  }
  
  
  useEffect(() => {
    // const nameSearch = "tales";
    // const searchLimit = 10;
    // const lowerPrice = 1;
    // const upperPrice = 100;
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
