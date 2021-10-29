export default function GameItem(props) {
  const {coords, game} = props;
  const [xCoord, yCoord] = coords.split(",");

  return (
    <a
      className="item game-item"
      href={`https://store.steampowered.com/app/${game.steam_appid}`}
      style={{"backgroundImage": `url(${game.header_image})`, "left": `${xCoord}%`, "bottom": `${yCoord}%`}}
      // style={{"left": `${xCoord}%`, "bottom": `${yCoord}%`}}
    >
    </a>
  )
}