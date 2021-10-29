import "./GameItem.scss";
import ReactTooltip from 'react-tooltip';

export default function GameItem(props) {
  const {coords, game} = props;
  const [xCoord, yCoord] = coords.split(",");

  const hoverInfo = `${game.name} ${game.price_overview.final_formatted}`;

  return (
    <>
      <a 
        data-for={game.name}
        data-tip
        data-iscapture="true"
        currentitem="false"
        className="item game-item"
        href={`https://store.steampowered.com/app/${game.steam_appid}`}
        style={{"backgroundImage": `url(${game.header_image})`, "left": `${xCoord}%`, "bottom": `${yCoord}%`}}
        // style={{"left": `${xCoord}%`, "bottom": `${yCoord}%`}}
      >  
      </a>
      <ReactTooltip id={game.name} place="top" type="info" effect="float">
        {game.name} <br/>
        {game.price_overview.final_formatted}
      </ReactTooltip>
    </> 
  )
}