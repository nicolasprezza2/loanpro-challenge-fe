import { useEffect, useState } from "react";
import './Login.css';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import { login } from "../Auth/auth.service";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../Auth/auth.service";
import Alert from 'react-bootstrap/Alert';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState();

    const nav = useNavigate();

    useEffect(() => { 
        if (getCurrentUser()) {
            console.log("getting user");
            nav("/calculator")
        }  
    }, []);
    

    const onSuccessfulLogin = () => {
        // Redirect to calculator
        nav("/calculator");
    }

    const onErrorLogin = (e) => {
        // Show error message
        setShowError(true);
    }

    const handleLogin = (e) => {
        login(email, password, onSuccessfulLogin, onErrorLogin);
    }

    return (
        <Form className="login-form">
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="your@email.com" 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="*****" 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button onClick={handleLogin}>Log in</Button>
            {
                showError && <Alert variant="danger">Could not validate username/password </Alert>
            }
           
        </Form>
    );
}

export default Login;