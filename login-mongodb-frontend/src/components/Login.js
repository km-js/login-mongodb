import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function Login({setLoginUser}) {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted with:", user)
    }

    const login = () => {
        axios.post("http://localhost:9002/login", user)
            .then(res => {
                alert(res.data.message)
            setLoginUser(res.data.user)
            navigate('/')
            })
    }

    return (
        <Container className="d-flex justify-content-center">
            <Form className="w-50" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label className="mt-4">
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={user.email}
                        onChange={handleChange}
                        required />

                </Form.Group>

                <Form.Group>
                    <Form.Label className="mt-4">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required />
                </Form.Group>

                <Button onClick={login} className="mt-4 mb-3" variant="primary" type="submit">Login</Button>
                <p> or</p>
                <Button onClick={()=> navigate('/register')} className="mb-5" variant="primary">Register</Button>
            </Form>
        </Container>
    )
}

export default Login