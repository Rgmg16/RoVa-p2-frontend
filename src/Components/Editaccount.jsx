import React, { useState, useEffect, useContext } from 'react';
import { Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EditAccount = () => {
    const { isAuthenticated, csrfToken, token } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
        profileImageUrl: ''
    });
    const [originalData, setOriginalData] = useState({});
    const [userId, setUserId] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/profile/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'X-CSRFToken': csrfToken,
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.error('Error fetching user data:', errorResponse);
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUserData({
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    profileImageUrl: data.profile_image
                });
                setOriginalData(data);
                setUserId(data.id);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [isAuthenticated, token, csrfToken]);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        setProfileImage(file);
        setRemoveImage(false);
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        setRemoveImage(true);
    };

    const handleUpdateAccount = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        } else {
            setPasswordError('');
        }

        const formData = new FormData();
        if (userData.name !== originalData.name) {
            formData.append('name', userData.name);
        }
        if (userData.username !== originalData.username) {
            formData.append('username', userData.username);
        }
        if (userData.email !== originalData.email) {
            formData.append('email', userData.email);
        }
        if (profileImage) {
            formData.append('profile_image', profileImage);
        } else if (removeImage) {
            formData.append('remove_profile_image', 'true');
        }
        if (password) {
            formData.append('password', password);
        }

        try {
            const response = await fetch(`http://localhost:8000/api/profile/${userId}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error updating profile:', errorResponse);
                setErrors(errorResponse);
                throw new Error('Failed to update profile');
            }

            console.log("Profile updated successfully");
            window.location.href = '/account';
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevVisible) => !prevVisible);
    };

    return (
        <Card className="mx-auto mt-5" style={{ width: '18rem', height: 'auto', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
            <Card.Body>
                <Card.Title><u>Edit Account</u></Card.Title>
                <Form onSubmit={handleUpdateAccount}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                    </Form.Group>
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        />
                        {errors.username && <p className="text-danger">{errors.username}</p>}
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>New Password:</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={passwordVisible ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword" className="mb-3">
                        <Form.Label>Confirm New Password:</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={passwordVisible ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formProfileImage" className="mb-3">
                        <Form.Label>Profile Image:</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleProfileImageChange}
                        />
                        {errors.profile_image && <p className="text-danger">{errors.profile_image}</p>}
                        {userData.profileImageUrl && (
                            <div className="mt-2">
                                <img src={userData.profileImageUrl} alt="Profile" style={{ width: '100%' }} />
                                <button type="button" className="btn btn-danger mt-2" onClick={handleRemoveImage}>Remove Image</button>
                            </div>
                        )}
                    </Form.Group>
                    <button type="submit" className="btn btn-primary">Update Account</button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EditAccount;

