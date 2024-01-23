import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SignUp Completed", user);
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user;

        //validation
        if (name && email && password && (password === reEnterPassword)) {
            //alert("posted")
            axios.post("http://localhost:9002/register", user)
                .then(res => {
                    alert(res.data.message)
                navigate('/login')
                })
        }
        else {
            alert("invalid input")
        }
    }

    return (
        <Container className='d-flex justify-content-center'>
            <Form className="w-50" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label className="mt-4">Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="mt-4">Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="mt-4">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="mt-4">Re Enter Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="reEnterPassword"
                        placeholder="Re Enter Password"
                        value={user.reEnterPassword}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button className="mt-4 mb-3" variant="primary" type="submit" onClick={register}>Register</Button>
                <p>or</p>
                <Button className="mb-5" variant="primary" onClick={() => navigate('/login')}>Login</Button>
            </Form>
        </Container>
    )
}

export default Register