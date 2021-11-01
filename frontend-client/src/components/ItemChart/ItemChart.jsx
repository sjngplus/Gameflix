import { useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import axios from 'axios';
import { stateContext } from "../../providers/StateProvider";
import { authContext } from "../../providers/AuthProvider";
import "./ItemChart.scss";
import Axis from "./Axis";
import GameItem from "./GameItem";
import { filterGamesListArray } from "../../helpers/filterHelpers";

let [chartMinX, chartMaxX] = [];
let [chartMinY, chartMaxY] = [];

export default function ItemChart() {

  const { state, setGamesList, setSocket, setOSFilter, setGenreFilter, setNumericFilters } = useContext(stateContext);
  const { setPrices, setRatings, setYears } = setNumericFilters;
  const [ filteredGamesList, setFilteredGameList ] = useState([]);

  const {user} = useContext(authContext);  

  const chartColumns = 100;
  const chartRows = 100;


  //Grab data from backend + create new socket during initial Render
  useEffect(() => {
    const newSocket = io();    
    setSocket(newSocket);    
    console.log("#####PINGING BACKEND DEALS/DB ENDPOINT#####");
    // const url = `/api/search/deals`;
    const url = `/api/search/database`;
    axios.get(url)
    .then(res => {
      // console.log("::Backend API Received Data Length:", res.data.length)
      setGamesList(res.data);
    }).catch(err => console.log(err));
    return () => newSocket.close();
  }, []);


  //Logic + Render when filters change
  useEffect(() => {    
    [chartMinX, chartMaxX] = state.filters.rating;    
    [chartMinY, chartMaxY] = state.filters.centPrices;
    const filteredArray = filterGamesListArray(state);
    setFilteredGameList(filteredArray);  
  }, [state.filters, state.gamesList])


  //Logic + Render when title search button is clicked
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
  }, [state.buttonToggles.search])


  // Render when socket gets new data
  useEffect(() => {  
    if(state.socket) {      
      state.socket.on('filter-state', (filterData) => {
        setOSFilter(filterData.os);
        setGenreFilter(filterData.genres);
        setPrices(filterData.centPrices);
        setRatings(filterData.rating);
        setYears(filterData.years);
      })

      state.socket.on('highlight-game', (incomingGame) => {       
        ReceivedToggleHighlight(incomingGame);
      });       
    }  
  }, [state.socket, state.gamesList])


  //Render when highlight favorites button is clicked
  useEffect(() => {
    state.favorites.map(game => {
      toggleHighlight(game.name)
    })
  }, [state.buttonToggles.highlightFavorites])


  //Render when On Sale Only switch is toggled
  useEffect(() => {
    const defaultFilters = {
      centPrices: [state.defaultValues.PRICEFLOOR, state.defaultValues.PRICECEILING],
      rating: [state.defaultValues.RATINGFLOOR, state.defaultValues.RATINGCEILING],      
    }    
    if (state.buttonToggles.onSaleBtn) {
      setPrices([100, 2000]);
      setRatings([70, 100]);
    } else {
      setPrices(defaultFilters.centPrices);
      setRatings(defaultFilters.rating);
    }
  }, [state.buttonToggles.onSaleBtn])


  const ReceivedToggleHighlight = (highlightedGame) => {
    const outputArray = [];
    state.gamesList.map(game => {
      if (game.name === highlightedGame.name) {
        game.highlight.isHighlighted = !game.highlight.isHighlighted;
        game.highlight.user = highlightedGame.highlight.user;
        game.highlight.color = highlightedGame.highlight.color;
      }
      outputArray.push(game);
    })
    setFilteredGameList(outputArray);
  };
  
  const toggleHighlight = (gameName) => {    
    const outputArray = [];
    filteredGamesList.map(game => {      
      if (game.name === gameName) {
        game.highlight.isHighlighted = !game.highlight.isHighlighted;
        game.highlight.user = user.id;
        game.highlight.color = user.id == 1  ? 'yellow' : 'red';
        state.socket.emit('highlight-game', game);
      }
      outputArray.push(game);
    })
    setFilteredGameList(outputArray);
  };  


  const chartCoords = {};
  filteredGamesList.map( game => {
    const xCoordPercent = (Math.floor((game.metacritic?.score - chartMinX) / (chartMaxX - chartMinX) * chartColumns) / chartColumns) * 100;
    const yCoordPercent = (Math.floor((game.price_overview.final  - chartMinY) / (chartMaxY - chartMinY) * chartRows) / chartRows) * 100;
    
    if (chartCoords[`${xCoordPercent},${yCoordPercent}`]) {
      chartCoords[`${xCoordPercent},${yCoordPercent}`].push(game)
    } else {
      chartCoords[`${xCoordPercent},${yCoordPercent}`] = [game]
    }
  })
  
  const parsedChartItems = Object.entries(chartCoords).map( ([coords, games]) => {
    if (games.length === 1) {
      //   // <Item {...{coords, games}} />
      //   return (<ClusterItem>{`+${games.length}`}</>);
      // } else {
      const game = games[0];
      return (
        <GameItem 
        key={game.steam_appid}
        {...{coords, game}}
        handleHighlight={toggleHighlight}
        />
      )
    }
  })
  
        
  return (
    <div className="item-chart">
      <Axis axisType="x-axis" name="Metacritic Rating" />
      <Axis axisType="y-axis" name="Price" />
      {parsedChartItems}
    </div>
  )
}