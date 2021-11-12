import { useContext, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { authContext } from "../../providers/AuthProvider";
import { stateContext } from "../../providers/StateProvider";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUndoAlt } from "react-icons/fa";
import "./filterModals.scss";

export default function LoadFilters() {
  const { user } = useContext(authContext);
  const { setFilters } = useContext(stateContext);
  const [show, setShow] = useState(false);
  const [userFilters, setUserFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDbFilters = () => {
    axios.get(`https://gameflix-backend-server.herokuapp.com/users/${user.id}/filters`)
      .then( res => {
        setUserFilters(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  const loadDbFilter = () => {
    axios.get(`https://gameflix-backend-server.herokuapp.com/users/${user.id}/filters/${activeFilter}`)
      .then( res => {
        setFilters(res.data);
        handleClose();
      })
      .catch(err => {
        console.log(err);
      });
  }
  const deleteFilter = filterId => {
    axios.delete(`https://gameflix-backend-server.herokuapp.com/users/${user.id}/filters/${filterId}`)
      .then( res => {
        handleClose();
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  const parsedUserFilters = userFilters.map(userFilter => {
    return (
      <tr
        key={userFilter.id}
        className={activeFilter === userFilter.id ? "selected-user-filter" : ""}
        onClick={() => setActiveFilter(userFilter.id)}
      >
        <td>{userFilter.name}</td>
        <td><Button variant="danger" onClick={() => deleteFilter(userFilter.id)}><AiOutlineDelete /></Button></td>
      </tr>
    )
  });

  return (
    <>
      <Button
        variant="warning"
        onClick={handleShow}
        disabled={!user}
        className="filter-load"
      >
        <FaUndoAlt/> Load
      </Button>

      <Modal onEnter={getDbFilters} show={show} onHide={handleClose} onExit={() => setActiveFilter(null)}>
      <Modal.Header closeButton>
          <Modal.Title>My Saved Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table hover>
            <col className="filter-name" />
            <col className="filter-delete" />
            <thead>
              <tr>
                <th>Name</th>
                <th className="delete-column">Delete</th>
              </tr>
            </thead>

            <tbody>
              {parsedUserFilters}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className="filter-modal-footer">
          <Button
            variant="warning"
            className="filter-load"
            disabled={!activeFilter}
            onClick={loadDbFilter}
          >
            <FaUndoAlt/> Load
          </Button>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}