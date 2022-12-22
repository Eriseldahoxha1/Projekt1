import * as React from "react";
import { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import uuid from "react-uuid";
import { Button, Form, Modal } from "react-bootstrap";
import "./Form.css";

export default function Forms({ getJobsite }) {
  const [show, setShow] = useState(false);

  const handleClosed = () => {
    setShow(false);
    clearInput();
  };
  const handleShow = () => setShow(true);

  const [jobsiteName, nameChange] = useState("");
  const [categoryIncluded, categoryChange] = useState([]);
  const [status, statusChange] = useState("");
  const [item, itemchange] = useState([]);

  const empJobSite = {
    id: "",
    jobsiteName,
    categoryIncluded,
    status,
    item,
  };
  const clearInput = () => {
    nameChange("");
    categoryChange([]);
    statusChange("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    empJobSite.id = uuid();
    getJobsite((prev) => [...prev, empJobSite]);
    handleClosed(false);
    clearInput();
    // fetch("http://localhost:4000/jobsites", {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(empJobSite),
    // })
    //   .then((resp) => {
    //     alert("saved");
    //     setOpen(false);
    //     clearInput();
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };

  return (
    <div>
      <button className="button1" onClick={handleShow}>
        Create
      </button>

      <Modal size="lg" show={show} onHide={handleClosed} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                value={jobsiteName}
                onChange={(e) => nameChange(e.target.value)}
                label="Name"
                placeholder="Type Jobsite Name"
                autoFocus
              />
            </Form.Group>
            <div className="form1">
              <div>
                <Form.Label>Category Included</Form.Label>
                <Form.Group
                  className="mb-3, form"
                  type="select"
                  value={categoryIncluded}
                  onChange={(e) => categoryChange(e.target.value)}
                >
                  <Multiselect
                    isObject={false}
                    onRemove={function noRefCheck() {}}
                    onSelect={function noRefCheck() {}}
                    options={["Sidewalk Shed", "Scaffold", "Shoring"]}
                  ></Multiselect>
                </Form.Group>
              </div>
              <div>
                <Form.Label>Status</Form.Label>
                <Form.Group
                  className="mb-3 form1"
                  value={status}
                  onChange={(e) => statusChange(e.target.value)}
                >
                  <Form.Select as="select">
                    <option>On-Road</option>
                    <option>On-Hold</option>
                    <option>Completed</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="Close" onClick={handleClosed}>
            Close
          </button>
          <button className="Save" onClick={handleSubmit}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
