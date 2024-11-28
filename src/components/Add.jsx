import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addStudentApi } from '../services/allApi';
import { addResponseContext } from '../contextApi/Context';

function Add() {

    const [student, setStudent] = useState({
        name: "", batch: "", phone: "", image: ""
    })
    
    useEffect(() => {
        if (student.image) {
            setPreview(URL.createObjectURL(student.image))
        } else {
            setPreview("")
        }
    }, [student.image])

    const [preview, setPreview] = useState("")

    const {addResponse,setAddResponse}=useContext(addResponseContext)

    const handleAddstudent = async () => {
        console.log(student)
        const {name,batch,phone,image}=student
        if(!name||!batch||!phone||!image){
            toast.warning("Enter Valid Input")
        }else{
            const fd=new FormData()
            fd.append("name",name)
            fd.append("batch",batch)
            fd.append("phone",phone)
            fd.append("image",image)

            const header = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            }
            const res = await addStudentApi(fd,header)
            console.log(res)
            if (res.status == 200) {
                toast.success("Student Added!!")
                handleClose()
                setAddResponse(res)
              
            }
            else {
                toast.error("Adding Failed!!")
            }
        }


    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className='m-3 d-flex justify-content-center align-items-center'>
                <button className=' btn btn-primary p-3' onClick={handleShow}>Add Student</button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modal-xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} sm={12} >
                            <label >
                                <input type="file" style={{ visibility: "hidden" }} onChange={(e) => setStudent({ ...student, image: e.target.files[0] })} />
                                <img src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLNNZWWtN0y8J7VpcqKU-s2MXVWLabnVtfgA&s"}
                                    className='img-fluid'
                                    width={'100%'}
                                    height={'100%'}
                                    alt="" />
                            </label>
                        </Col>
                        <Col md={6} sm={12}  >
                            <input type="text" onChange={(e) => setStudent({ ...student, name: e.target.value })} className='form-control mb-3' name='name' placeholder='Enter Name' />
                            <input type="text" onChange={(e) => setStudent({ ...student, batch: e.target.value })} className='form-control mb-3' name='dt' placeholder='Batch' />
                            <input type="number" onChange={(e) => setStudent({ ...student, phone: e.target.value })} className='form-control mb-3' name='phone' placeholder='Enter Phone Number' />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddstudent}>Add</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Add