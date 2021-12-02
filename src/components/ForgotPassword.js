import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError('');
            setLoading(true);
            setMessage('');
            await resetPassword(emailRef.current.value);
            setMessage('Check your email for further instructions');
        } catch(err) {
            console.log(err);
            setError('Failed to reset password');
        }

        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control autoComplete="on" type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-4">
                New here? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    );
};

export default ForgotPassword;
