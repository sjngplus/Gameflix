import { useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import axios from 'axios';
import { stateContext } from "../../providers/StateProvider";
import { authContext } from "../../providers/AuthProvider";
import "./ItemChart.scss";
import Axis from "./Axis";
import GameItem from "./GameItem";
import  filterGamesListArray from "../../helpers/filterHelpers";

import filterBounds from "../../data/filterBounds";
let [chartMinX, chartMaxX] = [];
let [chartMinY, chartMaxY] = [];
const chartColumns = 40;
const chartRows = 20;

export default function ItemChart() {

  const { state, setGamesList, setSocket, setOSFilter, setGenreFilter, setNameFilter, setNumericFilters } = useContext(stateContext);
  const { setPrices, setRatings, setYears } = setNumericFilters;
  const [ filteredGamesList, setFilteredGameList ] = useState([]);
  const [masterList, setMasterList] = useState([]);

  const {user} = useContext(authContext);  

  //Grab data from backend + create new socket during initial Render
  useEffect(() => {
    const newSocket = io('https://gameflix-backend-server.herokuapp.com/api/search/database');
    console.log("Socket:", newSocket);
    setSocket(newSocket);    
    console.log("#####PINGING BACKEND DB ENDPOINT#####");   
    const url = `https://gameflix-backend-server.herokuapp.com/api/search/database`;
    axios.get(url)
    .then(res => {
      // console.log("::Backend API Received Data Length:", res.data.length)
      setGamesList(res.data);
      setMasterList(res.data);
    }).catch(err => console.log(err));
    return () => newSocket.close();
  }, []);


  //Logic + Render when filters change
  useEffect(() => {    
    [chartMinX, chartMaxX] = state.filters.rating;    
    [chartMinY, chartMaxY] = state.filters.centPrices;
    const filteredArray = filterGamesListArray(state, masterList);
    setFilteredGameList(filteredArray);
  }, [state.filters, state.gamesList, masterList])


  //Logic + Render when title search button is clicked
  useEffect(() => {    
    const nameSearch = state.filters.name;
    if (nameSearch === "deals") {
      console.log("#####PINGING BACKEND DEALS ENDPOINT#####");
       const url = `https://gameflix-backend-server.herokuapp.com/api/search/deals`;
       axios.get(url)
       .then(res => {
         setGamesList(res.data);
         setMasterList(res.data);
       }).catch(err => console.log(err));
    }

    const searchLimit = 999;
    const url = `https://gameflix-backend-server.herokuapp.com/api/search/games?title=${nameSearch}&limit=${searchLimit}`;
    if (nameSearch) {
      console.log("#####PINGING BACKEND NAME ENDPOINT####");
      axios.get(url)
      .then(res => {
        console.log("::Name Search Route Data Length:", res.data.length)
        setGamesList(res.data);
        setMasterList(res.data);
      })
      .catch(err => console.log(err))        
    }
  }, [state.buttonToggles.search])


  //Render when highlight favorites button is clicked
  useEffect(() => {
    state.favorites.map(game => {
      toggleHighlight(game.name)
    })
  }, [state.buttonToggles.highlightFavorites])

  // Render when socket gets new data
  useEffect(() => {  
    if(state.socket) {      
      state.socket.on('filter-state', (filterData) => {
        setOSFilter(filterData.os);
        setGenreFilter(filterData.genres);
        setPrices(filterData.centPrices);
        setRatings(filterData.rating);
        setYears(filterData.years);
        setNameFilter(filterData.name);
      })

      state.socket.on('highlight-game', (incomingGame) => {
        ReceivedToggleHighlight(incomingGame);
      });       
    }  
  }, [state.socket])


  //Render when On Sale Only switch is toggled
  useEffect(() => {
    const defaultFilters = {
      centPrices: [state.defaultValues.PRICEFLOOR, state.defaultValues.PRICECEILING],
      rating: [state.defaultValues.RATINGFLOOR, state.defaultValues.RATINGCEILING],      
    }    
    if (state.buttonToggles.onSaleBtn) {
      setPrices([100, 2000]);
      setRatings([70, 90]);
    } else {
      setPrices(defaultFilters.centPrices);
      setRatings(defaultFilters.rating);
    }
  }, [state.buttonToggles.onSaleBtn])
 
 
  const ReceivedToggleHighlight = (incomingGameObj) => {
    const outputArray = [];      
    setMasterList(prev => {
      prev.forEach(game => {
        if (game.name === incomingGameObj.name) game = incomingGameObj
        outputArray.push(game)
      });
      return outputArray;
    });
  };
  
  
  const toggleHighlight = (gameName) => {    
    const outputArray = [];
    filteredGamesList.map(game => {      
      if (game.name === gameName) {
        game.highlight.isHighlighted = !game.highlight.isHighlighted;
        game.highlight.user = user.id;
        game.highlight.color = user.id === "1"  ? 'red' : 'blue';
        state.socket.emit('highlight-game', game);
      } 
      outputArray.push(game);
    })
    setFilteredGameList(outputArray);
  };  

  const chartZoom = event => {
    // Find the position of the mouse scroll relative to the chart size
    const [chartWidth, chartHeight] = [event.target.clientWidth, event.target.clientHeight];
    const [mouseX, mouseY] = [event.nativeEvent.layerX, event.nativeEvent.layerY];
    const [mouseXPercent, mouseYPercent] = [mouseX / chartWidth, 1 - (mouseY / chartHeight)]
    // Every scroll of the mouse will adjust the filters by at most 10% of the current min/max values
    const stepRatio = 0.1;
    const ratingStep = stepRatio * (state.filters.rating[1] - state.filters.rating[0]);
    const priceStep = stepRatio * (state.filters.centPrices[1] - state.filters.centPrices[0]);
    // Zoom in/out of the mouse location on the chart
    const zoomDirMult = event.deltaY > 0 ? -1 : 1;  // Zoom out -> -1, zoom in -> 1
    let xZoom = [ratingStep * zoomDirMult * mouseXPercent, ratingStep * (-1 * zoomDirMult) * (1 - mouseXPercent)];
    let yZoom = [priceStep * zoomDirMult * mouseYPercent, priceStep * (-1 * zoomDirMult) * (1 - mouseYPercent)];
    // Round multiplied values to human-convenient numbers
    xZoom = xZoom.map(value => Math.round(value));
    yZoom = yZoom.map(value => Math.round(value));
    // Prevent zooming out from original min/max values
    const newRatingMin = Math.max(state.filters.rating[0] + xZoom[0], filterBounds.rating.min);
    const newRatingMax = Math.min(state.filters.rating[1] + xZoom[1], filterBounds.rating.max);
    const newPriceMin = Math.max(state.filters.centPrices[0] + yZoom[0], filterBounds.centPrices.min);
    const newPriceMax = Math.min(state.filters.centPrices[1] + yZoom[1], filterBounds.centPrices.max);
    // Prevent excessive zoom-in along each axis
    if (newRatingMax > newRatingMin || zoomDirMult < 0) {
      setRatings([newRatingMin, newRatingMax]);
    }
    if (newPriceMax > newPriceMin || zoomDirMult < 0) {
      setPrices([newPriceMin, newPriceMax]);
    }
  }

  const chartCoords = {};
  console.log("FilteredGameList Length:",filteredGamesList.length)
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
    // Item for single game
    if (games.length === 1) {
      const game = games[0];
      return (
        <GameItem 
        key={game.steam_appid}
        {...{coords, game}}
        handleHighlight={toggleHighlight}
        />
      )
    // Cluster item
    } else {
      const [xCoord, yCoord] = coords.split(",");
      return (
        <div
          key={coords}
          className="item cluster-item"
          style={{"left": `${xCoord}%`, "bottom": `${yCoord}%`}}
        >
          +{games.length}
        </div>
      )
    }
  })
  
        
  return (
    <div className="item-chart" onWheel={chartZoom}>
      <Axis axisType="x-axis" name="Metacritic Rating" />
      <Axis axisType="y-axis" name="Price" />
      {parsedChartItems}
    </div>
  )
}