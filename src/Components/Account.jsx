import React, { useState, useEffect, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import defaultProfileImage from './RoVa.png'; // Adjust the path accordingly

const Account = () => {
    const { isAuthenticated, csrfToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState(defaultProfileImage);

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch user data from backend using session authentication
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/api/profile/', {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': csrfToken }
                    });
                    const { name, email, username, profile_image } = response.data;
                    setName(name);
                    setEmail(email);
                    setUsername(username);
                    setProfileImageUrl(profile_image || defaultProfileImage);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserData();
        } else {
            // Set fields to default "Sign in/Log in first" if not authenticated
            setName('Sign in/Log in first');
            setEmail('Sign in/Log in first');
            setUsername('Sign in/Log in first');
            setProfileImageUrl(defaultProfileImage);
        }
    }, [isAuthenticated, csrfToken]);

    return (
        <div className="d-flex justify-content-center mt-5">
            <Card className="text-center" style={{ width: '18rem', height: 'auto', backgroundColor: 'green', color: 'white', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
                {isAuthenticated && (
                    <div className="mt-3">
                        <img src={profileImageUrl} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    </div>
                )}
                <Card.Body>
                    <Card.Title><i>~ Account Information ~</i></Card.Title>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>Email:</strong> {email}</p>
                </Card.Body>
                {isAuthenticated && (
                    <div className="card-footer">
                        <Link to="/edit-account" className="text-blue-300 hover:text-blue-200">Edit Account</Link>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default Account;
