import { useContext, useState } from "react";
import { Modal, NavDropdown, Button, Table } from "react-bootstrap";
import { authContext } from "../../../providers/AuthProvider";
import axios from "axios";

export default function ViewFavs() {
  const { user } = useContext(authContext);
  const [show, setShow] = useState(false);
  const [parsedFavs, setParsedFavs] = useState(null);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getDbFavs = () => {
    axios.get(`http://localhost:3001/users/${user.id}/favorites`)
      .then( res => {
        // console.log(res.data)
        setParsedFavs(res.data.map(game => {
          return (
            <tr key={game.id}>
              <th>{game.name}</th>
            </tr>
          )
        }))
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <NavDropdown.Item onClick={handleShow} disabled={!user}>View Favorites</NavDropdown.Item>

      <Modal onEnter={getDbFavs} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {parsedFavs}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}