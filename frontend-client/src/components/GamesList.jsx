import axios from 'axios'
import Game from './Game'
import { useEffect, useState, useContext } from "react"
import { stateContext } from "../providers/StateProvider";


const GamesList = () => {

  const { state, setGamesList } = useContext(stateContext);
  const [ filteredGamesList, setFilteredGameList ] = useState([]);
  
  const filterGamesListArray = (inputList, filters) => {
    // console.log("Input Array Length:", inputList.length);
    const filteredByPrice = filterByPrice(inputList, filters.centPrices);
    const filteredByRating = filterByRating(filteredByPrice, filters.rating);
    const filteredByYear = filterByYear(filteredByRating, filters.years);
    const filteredByGenre = filterByGenre(filteredByYear, filters.genres);
    // console.log("Output Array Length:", filteredByGenre.length);
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
  
  const filterByGenre = (inputArray, genreFilter) => {
    const outputArray = [];
    const selectedGenres = Object.keys(genreFilter).filter(key => genreFilter[key]);
    console.log(selectedGenres);
    if (!selectedGenres.length) return inputArray;
    inputArray.forEach((game, index) => {
      const gameGenres = game.genres.map(genreObj => genreObj.description);      
      if (selectedGenres.every(genre => gameGenres.includes(genre))) outputArray.push(game);
    });
    
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
    console.log("#####PINGING BACKEND SERVER####")
    const url = `http://localhost:3003/api/search/deals`
    axios.get(url)
    .then(res => {
      setGamesList(res.data);
    })
    .catch(err => console.log(err))    
  }, []);
  
  useEffect(() => {
    const filteredArray = filterGamesListArray(state.gamesList, state.filters);
    setFilteredGameList(filteredArray);    
  }, [state.filters, state.gamesList])

  
    const parsedGameInfo = filteredGamesList.map(game => {
    const genresArray = game.genres.map(genre => ` ${genre.description}`)
    return <Game 
      key={game.steam_appid} 
      name={game.name}
      price={game.price_overview.final_formatted}
      genre={genresArray}

    />
  })   

  return (
    <div>
      <h5>Games List</h5>
      {parsedGameInfo}      
    </div>
  )
}

export default GamesList
