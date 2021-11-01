import { useState } from "react";
import { Modal, NavDropdown, Button } from "react-bootstrap";

export default function LoadFilters() {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item onClick={handleShow}>Load Filters</NavDropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Load Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Load and Fetch!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}