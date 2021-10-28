import "./Axis.scss";

export default function Axis(props) {
  const { axisType, name } = props;

  const axisClass = ["axis", `${axisType}`].join(" ");

  return (
    <div className={axisClass}>
      <div className="axis-label">
        {name}
      </div>
    </div>
  )
}