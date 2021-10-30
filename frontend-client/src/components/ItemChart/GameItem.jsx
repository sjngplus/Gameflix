import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../providers/StateProvider";
import "./GameItem.scss";
import ReactTooltip from 'react-tooltip';
import { Button, ButtonGroup, Container, Figure } from 'react-bootstrap';

export default function GameItem(props) {
  const {coords, game} = props;
  const [xCoord, yCoord] = coords.split(",");
  const { setGamesList } = useContext(stateContext);
  const [ gameHighlight, setGameHighlight ] = useState(game.highlight.isHighlighted);

  const parsedGenre = game.genres.map(genreObj => ` ${genreObj.description} |`);
  
  let highlightColor = "";
  if (gameHighlight) highlightColor = "yellow";
  
  useEffect(() => {

  }, [gameHighlight]);
  

  return (
    <>
      <a 
        data-for={game.name}
        data-tip
        className={gameHighlight ? "item highlighted" : "item"}
        href={`https://store.steampowered.com/app/${game.steam_appid}`}
        style={{borderColor: `${highlightColor}`,  "backgroundImage": `url(${game.header_image})`, "left": `${xCoord}%`, "bottom": `${yCoord}%`}}
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
            <Button variant="info" onClick={e => {
                setGameHighlight(prev => (!prev));                
              }}>Highlight</Button>            
            <Button variant="warning">Favorite</Button>
          </ButtonGroup>
        </Container>
      </ReactTooltip>
    </> 
  )
}

