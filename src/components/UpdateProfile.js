import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        const promises = [];
        setError('');
        setLoading(true);

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value !== currentUser.password) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
        .then(() => {
            navigate('/');
        })
        .catch(() => {
            setError('Failed to update account');
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control autoComplete="on" type="email" ref={emailRef} required defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control autoComplete="on" type="password" ref={passwordRef}  placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control autoComplete="on" type="password" ref={passwordConfirmRef}  placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-4">
                <Link to="/">Cancel</Link>
            </div>
        </>
    );
};

export default UpdateProfile;
