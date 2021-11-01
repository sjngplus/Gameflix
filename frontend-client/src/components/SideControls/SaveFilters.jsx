import { useContext, useState } from "react";
import { Modal, Button, ListGroup, ButtonGroup, Form, FloatingLabel } from "react-bootstrap";
import { authContext } from "../../providers/AuthProvider";
import { stateContext } from "../../providers/StateProvider";
import axios from "axios";
import { FaUndoAlt } from "react-icons/fa";
import "./filterModals.scss";

export default function SaveFilters() {
  const { user } = useContext(authContext);
  const { state } = useContext(stateContext);
  const filterSettings = state.filters;
  const [filterName, setFilterName] = useState('');
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveFilter = event => {
    event.preventDefault();
    axios.post(`http://localhost:3001/users/${user.id}/filters`, {"filterName": filterName, "filterSettings": filterSettings})
    .then(res => {
        if (res.data === "Success") {
          console.log("Save submit")
          return handleClose();
        }
        return (console.log(res.data));
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        disabled={!user}
      >
        <FaUndoAlt/> Save
      </Button>

      <Modal onEnter={() => console.log(filterSettings)} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Save Current Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={saveFilter}>
            <FloatingLabel label="Filter Name" controlId="floatingInput" className="mb-3">
              <Form.Control
                type="text"
                value={filterName}
                placeholder=""
                onChange={event => setFilterName(event.target.value)}
              />
            <Form.Text id="nameHelpBlock" muted>
              Save your filters to use later!
            </Form.Text>
            </FloatingLabel>

          </Form>
        </Modal.Body>
        <Modal.Footer className="filter-modal-footer">
          <Button variant="success" onClick={saveFilter}>Save</Button>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}