import "./GameItem.scss";
import ReactTooltip from 'react-tooltip';
import { Button, ButtonGroup, Container, Figure } from 'react-bootstrap';

export default function GameItem(props) {
  const {coords, game} = props;
  const [xCoord, yCoord] = coords.split(",");

  const parsedGenre = game.genres.map(genreObj => ` ${genreObj.description}`);

  return (
    <>
      <a 
        data-for={game.name}
        data-tip
        className="item game-item"
        href={`https://store.steampowered.com/app/${game.steam_appid}`}
        style={{"backgroundImage": `url(${game.header_image})`, "left": `${xCoord}%`, "bottom": `${yCoord}%`}}
        // style={{"left": `${xCoord}%`, "bottom": `${yCoord}%`}}
      >  
      </a>
      <ReactTooltip 
      id={game.name} 
      place="top" 
      type="light" 
      effect="solid" 
      delayHide={50} 
      className="hover-info"
      >
        <Figure>
          <Figure.Image
            width={300}
            height={180}
            alt="171x180"
            src={game.header_image}
          />          
        </Figure>
        <Container>
          <h5>{game.name}</h5> 
          {game.price_overview.final_formatted} <br/>
          {parsedGenre}
        </Container>
        <Container>
          <ButtonGroup>
            <Button variant="secondary">Left</Button>
            <Button variant="secondary">Middle</Button>
            <Button variant="secondary">Right</Button>
          </ButtonGroup>
        </Container>
      </ReactTooltip>
    </> 
  )
}

