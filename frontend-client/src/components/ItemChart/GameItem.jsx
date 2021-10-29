import { useContext } from "react";
import { stateContext } from "../../providers/StateProvider";
import "./GameItem.scss";
import ReactTooltip from 'react-tooltip';
import { Button, ButtonGroup, Container, Figure } from 'react-bootstrap';

export default function GameItem(props) {
  const { setGamesList } = useContext(stateContext);
  const {coords, game} = props;
  const [xCoord, yCoord] = coords.split(",");

  const parsedGenre = game.genres.map(genreObj => ` ${genreObj.description} |`);

  return (
    <>
      <a 
        data-for={game.name}
        data-tip
        className={game.highlight.isHighlighted ? "item game-item highlighted" : "item game-item"}
        href={`https://store.steampowered.com/app/${game.steam_appid}`}
        style={{"backgroundImage": `url(${game.header_image})`, "left": `${xCoord}%`, "bottom": `${yCoord}%`}}
        // style={{"left": `${xCoord}%`, "bottom": `${yCoord}%`}}
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
            width={300}
            height={180}
            src={game.header_image}
          />          
        </Figure>
        <Container>
          <h5 style={{wordWrap: "break-word", maxWidth: 300}}>{game.name}</h5> 
          <p>{game.price_overview.final_formatted} | Released Year : {game.release_date.date.slice(-4)}</p>
          <p>{parsedGenre}</p>
          <p></p>
        </Container>
        <Container>
          <ButtonGroup className="my-2">
            <Button variant="info">Highlight</Button>            
            <Button variant="warning">Favorite</Button>
          </ButtonGroup>
        </Container>
      </ReactTooltip>
    </> 
  )
}

