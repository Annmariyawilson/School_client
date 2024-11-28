import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerApi, loginApi } from '../services/allApi'

function Auth() {

    const [user, setUser] = useState({
        email: "", password: "", username: ""
    })

    const [state, setState] = useState(false)

    const changeState = () => {
        setState(!state)
    }
    const nav=useNavigate()
   

    const handleRegister = async () => {
        console.log(user);
        const { username, password, email } = user
        if (!username || !password || !email) {
            toast.warning("Enter Valid Input")
        } else {
            const res = await registerApi(user)
            console.log(res);
            if (res.status == 200) {
                toast.success("Registration Succesfull!!")
                changeState()
                setUser({
                    email: "", password: "", username: ""
                })
            }
            else {
                toast.warning("Registration Failed!!")
            }

        }

    }

    const handleLogin = async () => {
        const { email, password } = user
        if (!email || !password) {
            toast.warning("Enter Valid Input!!")

        } else {
            const res = await loginApi({ email, password })
            if (res.status == 200) {
                console.log(res);
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('username',res.data.username)
                toast.success("Login Successfull!")
                setUser({
                    email: "", password: "", username: ""
                })
                nav('/dash')
            } else {
                toast.error("Login Failed")
                console.log(res);

            }


        }
    }

    return (
        <>
            <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <div className='w-75  shadow bg-light p-2'>
                    <Row>
                        <Col>
                            <img src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
                                alt="" className='img-fluid' />
                        </Col>
                        <Col className='d-flex flex-column justify-content-center'>
                            {
                                state ?
                                    <h2>Registration</h2>
                                    :
                                    <h3>Login</h3>


                            }
                            <input type="text" placeholder='Email ID' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} name='email' className='form-control mb-3 ' />
                            {
                                state &&
                                <input type="text" placeholder='User Name' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} name='username' className=' form-control mb-3 ' />

                            }
                            <input type="password" placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} name='pwd' className=' form-control mb-3 ' />
                            <div className='d-flex justify-content-between'>
                                {
                                    state ?
                                        <button className='btn btn-success' onClick={handleRegister} >Register</button>
                                        :
                                        <button className='btn btn-info' onClick={handleLogin}>Login</button>
                                }
                                <button className='btn btn-link' onClick={changeState}>
                                    {
                                        state ?
                                            <span>Already a User</span>
                                            :
                                            <span>New User</span>
                                    }
                                </button>

                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
        </>
    )
}

export default Auth