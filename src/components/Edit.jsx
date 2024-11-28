import React from 'react'
import { useState, useEffect ,useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import { editStudentApi } from '../services/allApi';
import { editResponseContext } from '../contextApi/Context';

function Edit({ student, updateStudentList }) {
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState({ ...student });
    const [preview, setPreview] = useState("");
    const { setEditResponse } = useContext(editResponseContext);
  
    useEffect(() => {
      if (detail.image?.type) {
        setPreview(URL.createObjectURL(detail.image));
      } else {
        setPreview("");
      }
    }, [detail.image]);
  
    const handleEdit = async () => {
      const { name, batch, phone, image } = detail;
      if (!name || !batch || !phone || !image) {
        toast.warning("Invalid Data");
      } else {
        const header = {
          'Content-Type': detail.image?.type ? 'multipart/form-data' : 'application/json',
          'Authorization': `Token ${sessionStorage.getItem('token')}`
        };
  
        const data = detail.image?.type
          ? (() => {
              const fd = new FormData();
              fd.append("name", name);
              fd.append("batch", batch);
              fd.append("phone", phone);
              fd.append("image", image);
              return fd;
            })()
          : detail;
  
        const res = await editStudentApi(student._id, data, header);
  
        if (res.status === 200) {
          toast.success("Student Details Updated");
          setEditResponse(res);
          handleClose();
          updateStudentList(res.data);
        } else {
          toast.warning("Student update failed");
        }
      }
    };
  
    const handleClose = () => {
      setShow(false);
    };
  
    const handleShow = () => setShow(true);
  
    return (
      <>
        <button className="btn" onClick={handleShow}>
          <i className="fa-solid fa-pen-to-square" style={{ color: "#3772d7" }} />
        </button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="modal-xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6} sm={12}>
                <label>
                  <input
                    type="file"
                    onChange={(e) => setDetail({ ...detail, image: e.target.files[0] })}
                    style={{ visibility: "hidden" }}
                  />
                  <img
                    src={preview ? preview : `${base_url}/uploads/${student?.image}`}
                    className="img-fluid"
                    width={"100%"}
                    height={"100%"}
                    alt=""
                  />
                </label>
              </Col>
              <Col md={6} sm={12}>
                <input
                  type="text"
                  defaultValue={student?.name}
                  onChange={(e) => setDetail({ ...detail, name: e.target.value })}
                  className="form-control mb-3"
                  placeholder="Enter Name"
                />
                <input
                  type="text"
                  defaultValue={student?.batch}
                  onChange={(e) => setDetail({ ...detail, batch: e.target.value })}
                  className="form-control mb-3"
                  placeholder="Batch"
                />
                <input
                  type="number"
                  defaultValue={student?.phone}
                  onChange={(e) => setDetail({ ...detail, phone: e.target.value })}
                  className="form-control mb-3"
                  placeholder="Enter Phone Number"
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default Edit;
  