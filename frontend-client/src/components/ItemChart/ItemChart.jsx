import "./ItemChart.scss";
import Axis from "./Axis";

export default function ItemChart() {

  return (
    <div className="item-chart">
      <Axis axisType="x-axis" name="Metacritic Rating" />
      <Axis axisType="y-axis" name="Price" />
    </div>
  )
}