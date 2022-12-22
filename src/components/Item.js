import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Item.css";
import data from "./MockData";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const Item = () => {
  const [initailItem, setInitialItem] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { jobsiteid } = useParams();
  const navigate = useNavigate();
  const [fitlerItemList, setFitlerItemList] = useState(null);

  const [filteredValue, setFilteredValue] = useState(null);

  useEffect(() => {
    setInitialItem(jobsite.items);
  }, []);

  const jobsite = data.find((item) => item.id === jobsiteid);

  const [editFormData, setEditFormdata] = useState({
    item: "",
    quantity: "",
    description: "",
    notes: "",
    category: "",
  });

  const handleFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormdata(newFormData);
  };

  const [editFormId, setEditFormid] = useState(null);
  const handleClick = (event, item) => {
    event.preventDefault();
    setEditFormid(item.id);
    const formValues = {
      id: item.id,
      item: item.item,
      quantity: item.quantity,
      description: item.description,
      notes: item.notes,
      category: item.category,
    };
    setEditFormdata(formValues);
    handleShow();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const editedItem = {
      id: editFormData.id,
      item: editFormData.item,
      quantity: editFormData.quantity,
      description: editFormData.description,
      notes: editFormData.notes,
      category: editFormData.category,
    };
    const selectedItem = initailItem.findIndex(
      (item) => item.id === editedItem.id
    );

    initailItem[selectedItem] = { ...editedItem };
    handleClose();
  };

  return (
    <div>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group></Form.Group>
          <Form className="form-grid">
            <div className="form2">
              <div>
                <Form.Label>Item</Form.Label>
                <Form.Control
                  className="Name"
                  type="text"
                  required="required"
                  placeholder="Enter Item...."
                  name="item"
                  value={editFormData.item}
                  onChange={handleFormChange}
                ></Form.Control>
              </div>
              <div>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  className="Quantity"
                  type="number"
                  min={0}
                  required="required"
                  placeholder="Enter Quantity...."
                  name="quantity"
                  value={editFormData.quantity}
                  onChange={handleFormChange}
                ></Form.Control>
              </div>
            </div>
            <Form.Label>Decription</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="Description"
              type="text"
              required="required"
              placeholder="Enter Decription...."
              name="description"
              value={editFormData.description}
              onChange={handleFormChange}
            ></Form.Control>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              className="Notes"
              as="textarea"
              rows={3}
              type="text"
              required="required"
              placeholder="Enter Notes...."
              name="notes"
              value={editFormData.notes}
              onChange={handleFormChange}
            ></Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="Close" onClick={handleClose}>
            Close
          </button>
          <button className="Save" onClick={handleSubmit}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
      <div className="kot">
        <div className="test1">
          <div className="jobsite-title">
            <div className="jobsite-title-name">{jobsite.jobsiteName}</div>
          </div>
          <div>
            {jobsite.categoryIncluded?.map((category) => (
              <button
                className="category-button"
                onClick={() => setFilteredValue(category)}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="button-div">
            <button
              className="buttonBack"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </button>
          </div>
        </div>
        <div className="test2">
          <div className="item-header">
            {" "}
            {filteredValue ? (
              <div className="header-name">{filteredValue}</div>
            ) : (
              <div className="header-name">Data Grid</div>
            )}
          </div>
          {filteredValue ? (
            <Table striped>
              <thead className="itemtable">
                <tr>
                  <th>Nr.</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {initailItem
                  .filter((item) => item.category === filteredValue)
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <a onClick={(event) => handleClick(event, item)}>
                          {item.item}
                        </a>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.description}</td>
                      <td>{item.notes}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            <div className="emptycategory">
              <div>
                <h2 className="emptycategory"> No Service Selected</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Item;
