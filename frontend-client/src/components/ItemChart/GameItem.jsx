import "./GameItem.scss";
import ReactTooltip from 'react-tooltip';
import { Button, ButtonGroup, Container, Figure } from 'react-bootstrap';
import { authContext } from "../../providers/AuthProvider";
import { useState, useContext } from "react";
import axios from "axios";

export default function GameItem(props) {
  const {coords, game, handleHighlight} = props;
  const [xCoord, yCoord] = coords.split(",");
  const { user } = useContext(authContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const parsedGenre = game.genres.map(genreObj => ` ${genreObj.description} |`);

  const favoriteGame = gameId => {
    axios.post(`http://localhost:3001/users/${user.id}/favorites`, {"steamAppId": gameId})
      .then(res => {
        setIsFavorite(res.data === "Success");
      })
      .catch(err => {
        console.log(err);
      })
  };

  let highlightColor = "";
  if (game.highlight.isHighlighted && game.highlight.user == 1 ) highlightColor = "red";
  if (game.highlight.isHighlighted && game.highlight.user == 2 ) highlightColor = "blue";   

  
  // Check if favorited on first render
  if (user) {
    axios.get(`http://localhost:3001/users/${user.id}/favorites/${game.steam_appid}`)
      .then( res => {
        setIsFavorite(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <>
      <a 
        data-for={game.name}
        data-tip
        className={game.highlight.isHighlighted ? "item highlighted" : "item"}
        href={`https://store.steampowered.com/app/${game.steam_appid}`}
        style={{borderColor: `${highlightColor}`,  "backgroundImage": `url(${game.header_image})`, "left": `${xCoord}%`, "bottom": `${yCoord}%`}}
      >  
      </a>
      <ReactTooltip 
      id={game.name} 
      place="top" 
      type="dark" 
      effect="solid" 
      delayHide={50} 
      className="hover-info"
      >
        <Figure>
          <Figure.Image
            width="auto"
            height={180}
            src={game.header_image}
            style={{maxWidth: 320}}
          />          
        </Figure>
        <Container>
          <h5 style={{wordWrap: "break-word", maxWidth: 300}}>{game.name}</h5> 
          <p>{game.price_overview.final_formatted} | Released Year : {game.release_date.date.slice(-4)}</p>
          <p style={{wordWrap: "break-word", maxWidth: 300}}>{parsedGenre}</p>
          <p></p>
        </Container>
        <Container>
          <ButtonGroup className="my-2">
            <Button variant="info" onClick={() => handleHighlight(game.name)}>Highlight</Button>
            {isFavorite ?
              <Button
                variant="warning"
              >
                ♥ Favorited
              </Button>
              :
              <Button
                variant="warning"
                onClick={ event => {
                  favoriteGame(game.steam_appid)
                }}
              >
                ♡ Favorite
              </Button>
            }
          </ButtonGroup>
        </Container>
      </ReactTooltip>
    </> 
  )
}

