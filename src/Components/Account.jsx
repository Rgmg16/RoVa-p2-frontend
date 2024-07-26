import React, { useState, useEffect, useContext } from 'react';
import { Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cx from 'classnames';
import { AuthContext } from '../context/AuthContext';

const Account = () => {
    const { isAuthenticated } = useContext(AuthContext); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch user data from backend using session authentication
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/api/profile/', {
                        withCredentials: true // Include cookies with the request
                    });
                    const { name, email, username, profile_image } = response.data;
                    setName(name);
                    setEmail(email);
                    setUsername(username);
                    setProfileImageUrl(profile_image || '');
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
            setProfileImageUrl('');
        }
    }, [isAuthenticated]);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        setProfileImage(file);
    };

    const handleUploadProfileImage = async () => {
        try {
            if (!profileImage) {
                console.error("No profile image selected");
                return;
            }

            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('profile_image', profileImage);

            // Upload the profile image to the backend using session authentication
            await axios.patch('http://localhost:8000/api/profile/update/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true // Include cookies with the request
            });

            // Fetch the updated user data
            const response = await axios.get('http://localhost:8000/api/profile/', {
                withCredentials: true // Include cookies with the request
            });
            setProfileImageUrl(response.data.profile_image || '');

            // Clear the profileImage state after successful upload
            setProfileImage(null);

            console.log("Profile image uploaded successfully");
        } catch (error) {
            console.error("Error uploading profile image:", error);
        }
    };

    return (
        <Card className="mx-auto mt-5" style={{ width: '18rem', height: '25rem', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
            <Card.Body>
                <Card.Title><u>Account Information</u></Card.Title>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
                
                {isAuthenticated && profileImageUrl && (
                    <div>
                        <img src={profileImageUrl} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    </div>
                )}
                {isAuthenticated && (
                    <>
                        <Form.Group controlId="formProfileImage" className="mb-3">
                            <Form.Label>Upload Profile Photo</Form.Label>
                            <Form.Control type="file" onChange={handleProfileImageChange} />
                        </Form.Group>
                        <button className={cx('bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded', 'mb-3', 'mr-3')} onClick={handleUploadProfileImage}>Upload</button>
                    </>
                )}
            </Card.Body>
            {isAuthenticated && (
                <div className="card-footer">
                    <Link to="/edit-account" className="text-green-600 hover:text-green-500">Edit Account</Link>
                </div>
            )}
        </Card>
    );
}

export default Account;
