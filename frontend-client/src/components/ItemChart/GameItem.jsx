import "./GameItem.scss";
import ReactTooltip from 'react-tooltip';

export default function GameItem(props) {
  const {coords, game} = props;
  const [xCoord, yCoord] = coords.split(",");

  const hoverInfo = `${game.name} ${game.price_overview.final_formatted}`;

  return (
    <>
      <a 
        data-tip={hoverInfo}
        className="item game-item"
        href={`https://store.steampowered.com/app/${game.steam_appid}`}
        style={{"backgroundImage": `url(${game.header_image})`, "left": `${xCoord}%`, "bottom": `${yCoord}%`}}
        // style={{"left": `${xCoord}%`, "bottom": `${yCoord}%`}}
      >  
      </a>
      <ReactTooltip place="top" type="light" effect="float">      
      </ReactTooltip>
    </>
  )
}