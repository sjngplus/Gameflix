import { useContext, useEffect } from "react";

import { stateContext } from "../../providers/StateProvider";
import "./ItemChart.scss";
import Axis from "./Axis";
import GameItem from "./GameItem";

let [chartMinX, chartMaxX] = [];
let [chartMinY, chartMaxY] = [];

export default function ItemChart() {
  const { state } = useContext(stateContext);
  const unfilteredGamesList = state.gamesList;
  
  const chartColumns = 100;
  const chartRows = 100;

  useEffect( () => {
    [chartMinX, chartMaxX] = state.filters.rating;
    [chartMinY, chartMaxY] = state.filters.centPrices;
  }, [state.filters])

  const chartCoords = {};
  unfilteredGamesList.map( game => {
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