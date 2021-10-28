export default function GameItem(props) {
  const {coords, game} = props;
  // console.log(props)

  return (
    <a
      className="item game-item"
      href={`https://store.steampowered.com/app/${game.steam_appid}`}
      // style={{"background-image": `url(${game.header_image})`}}
    >
    </a>
  )
}