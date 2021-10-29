import io from "socket.io-client";
import axios from 'axios';
import Game from './Game';
import { useEffect, useState, useContext } from "react";
import { stateContext } from "../providers/StateProvider";
import { filterGamesListArray } from "../helpers/filterHelpers";


const GamesList = () => {

  const { state, setGamesList, setSocket, setOSFilter, setGenreFilter, setNumericFilters } = useContext(stateContext);
  const { setPrices, setRatings, setYears } = setNumericFilters;
  const [ filteredGamesList, setFilteredGameList ] = useState([]);

  //Grab data from backend + create new socket during initial Render
  useEffect(() => {
    const newSocket = io();    
    setSocket(newSocket);
    console.log("#####PINGING BACKEND DEALS/DB ENDPOINT#####");
    const url = `/api/search/deals`;
    // const url = `/api/search/database`;
    axios.get(url)
    .then(res => {
      // console.log("::Backend API Received Data Length:", res.data.length)
      setGamesList(res.data);
    }).catch(err => console.log(err));
    return () => newSocket.close();
  }, []);
  
  useEffect(() => {
    const filteredArray = filterGamesListArray(state.gamesList, state.filters);
    setFilteredGameList(filteredArray);    
  }, [state.filters, state.gamesList])


  useEffect(() => {
    const nameSearch = state.filters.name;
    const searchLimit = 999;
    const url = `http://localhost:3001/api/search/games?title=${nameSearch}&limit=${searchLimit}`;
    if (nameSearch) {
      console.log("#####PINGING BACKEND NAME ENDPOINT####");
      axios.get(url)
      .then(res => {
        console.log("::Name Search Route Data Length:", res.data.length)
        setGamesList(res.data);
      })
      .catch(err => console.log(err))        
    }
  }, [state.buttonToggles])

  
  useEffect(() => {
    if (state.socket) {
      state.socket.on('filter-state', (filterData) => {
        console.log(filterData);
        setOSFilter(filterData.os);
        setGenreFilter(filterData.genres);
        setPrices(filterData.centPrices);
        setRatings(filterData.rating);
        setYears(filterData.years);
      })    
    }
  }, [state.socket])

  
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