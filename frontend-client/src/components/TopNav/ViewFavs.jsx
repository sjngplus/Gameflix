import { useContext, useState } from "react";
import { Modal, Button, ListGroup, ButtonGroup } from "react-bootstrap";
import { authContext } from "../../providers/AuthProvider";
import { stateContext } from "../../providers/StateProvider";
import axios from "axios";
import { FaStar, FaSteam } from "react-icons/fa";

export default function ViewFavs() {
  const { user } = useContext(authContext);
  const [show, setShow] = useState(false);
  const { state, setFavorites, setHighlightFavToggle } = useContext(stateContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const getDbFavs = () => {
    axios.get(`/users/${user.id}/favorites`)
      .then( res => {
        setFavorites(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  } 

  const parsedFavList = state.favorites.map(game => {
    return (           
      <ListGroup.Item key={game.id} action href={`https://store.steampowered.com/app/${game.id}`}>
        <FaSteam style={{fontSize: "20px", marginRight: "7px"}}/>
        {game.name}
      </ListGroup.Item>
    )
  })

  return (
    <>
      <Button variant="warning" style={{color: "white", fontWeight: "bold"}} onClick={handleShow} disabled={!user}><FaStar/> My Favorites</Button>

      <Modal onEnter={getDbFavs} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Favorites List</Modal.Title>
        </Modal.Header>
        <Modal.Body>         
          <ListGroup>
            {parsedFavList}           
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup aria-label="Basic example">
            <Button variant="info" onClick={e => setHighlightFavToggle()} style={{color: "white", fontWeight: "bold"}}>Highlight Favorites</Button>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </>
  )
}