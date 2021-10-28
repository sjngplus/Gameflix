import { useContext } from "react";

import { stateContext } from "../../providers/StateProvider";
import "./ItemChart.scss";
import Axis from "./Axis";
import GameItem from "./GameItem";

export default function ItemChart() {
  const { state } = useContext(stateContext);
  // console.log(state.gamesList)
  const unfilteredGamesList = state.gamesList;

  const chartCoords = {};
  unfilteredGamesList.map( game => {
    if (chartCoords[`${game.metacritic}, ${game.price_overview.final}`]) {
      chartCoords[`${game.metacritic},${game.price_overview.final}`].push(game)
    } else {
      chartCoords[`${game.metacritic},${game.price_overview.final}`] = [game]
    }
  })

  const parsedChartItems = Object.entries(chartCoords).map( (coords, games) => {
    return (games.length > 1 ?
      
      <></>
      :
      <GameItem {...{coords, games}} />
    )
  })

  return (
    <div className="item-chart">
      <Axis axisType="x-axis" name="Metacritic Rating" />
      <Axis axisType="y-axis" name="Price" />
      {parsedChartItems}
    </div>
  )
}