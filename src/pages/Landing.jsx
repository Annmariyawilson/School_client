import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <>
            <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: '100vh', backgroundColor:'purple' }}>
                <div className='w-75 p-5'>
                    <Row>
                        <Col>
                            <h3>Student Management</h3>
                            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, facere? Quo expedita obcaecati ducimus inventore, cupiditate dicta rem exercitationem quod optio eius, nobis modi voluptate! Iste voluptatem ea vitae voluptatibus?</p>
                        <Link to={'/auth'} className='btn btn-success'>Let's Go</Link>
                        </Col>
                        <Col>
                        <img src="https://savvycomsoftware.com/wp-content/uploads/2024/03/what-is-a-student-management-system-3.png"
                         alt="" className='img-fluid w-100'/>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Landing