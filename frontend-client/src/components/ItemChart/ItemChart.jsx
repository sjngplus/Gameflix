import { useContext } from "react";

import { stateContext } from "../../providers/StateProvider";
import "./ItemChart.scss";
import Axis from "./Axis";
import GameItem from "./GameItem";

export default function ItemChart() {
  const { state } = useContext(stateContext);
  // console.log(state.gamesList)
  const unfilteredGamesList = state.gamesList;

  const [chartMinX, chartMaxX] = [0, 100];      // Rating
  const chartColumns = 100;
  const [chartMinY, chartMaxY] = [0, 1000];    // Price
  const chartRows = 100;

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
  // console.log("chartCoords:", chartCoords)

  const parsedChartItems = Object.entries(chartCoords).map( ([coords, games]) => {
    if (games.length === 1) {
    //   // <Item {...{coords, games}} />
    //   return (<></>);
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