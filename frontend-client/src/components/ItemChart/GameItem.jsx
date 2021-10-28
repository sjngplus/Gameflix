export default function GameItem(props) {
  const {coords, games} = props;

  return (
    <a
      className="item game-item"
      href={`https://store.steampowered.com/api/appdetails?appids=${games.steam_appid}`}
      background-image={`url(${games.header_image})`}
    >
    </a>
  )
}