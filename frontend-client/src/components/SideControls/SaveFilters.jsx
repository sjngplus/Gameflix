import { useContext, useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { authContext } from "../../providers/AuthProvider";
import { stateContext } from "../../providers/StateProvider";
import axios from "axios";
import { FaSave } from "react-icons/fa";
import "./filterModals.scss";

export default function SaveFilters() {
  const { user } = useContext(authContext);
  const { state } = useContext(stateContext);
  const filterSettings = state.filters;
  const [filterName, setFilterName] = useState("");
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveFilter = event => {
    event.preventDefault();
    axios.post(`/users/${user.id}/filters`, {"filterName": filterName, "filterSettings": filterSettings})
    .then(res => {
        if (res.data === "Success") {
          setFilterName("");
          handleClose();
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
        <FaSave /> Save
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Current Filters</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={saveFilter}>
            <FloatingLabel label="Filter Name" controlId="floatingInput" className="mb-3">
              <Form.Control
                type="text"
                value={filterName}
                placeholder=" "
                onChange={event => setFilterName(event.target.value)}
              />            
            </FloatingLabel>
          </Form>
        </Modal.Body>

        <Modal.Footer className="filter-modal-footer">
          <Button variant="success" onClick={saveFilter}><FaSave/> Save</Button>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}