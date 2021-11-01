import { useState } from "react";
import { Modal, NavDropdown, Button, Form } from "react-bootstrap";

export default function SaveFilters() {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item onClick={handleShow}>Save Filters</NavDropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}