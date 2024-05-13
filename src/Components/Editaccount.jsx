import React, { useState,useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { storage } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile ,updatePassword} from 'firebase/auth'; // Import Firebase auth methods
import Account from './Account';

const EditAccount = ({ name: initialName, email, username: initialUsername, profileImageUrl: initialProfileImageUrl }) => {
    const [name, setName] = useState(initialName);
    const [username, setUsername] = useState(initialUsername);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [passwordError, setPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

    useEffect(() => {
        // Fetch data from localStorage
        const storedName = localStorage.getItem('name');
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        
        // Set initial state with fetched data
        setName(storedName || '');
        setUsername(storedUsername || '');
        setPassword(storedPassword || '');
    }, []);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        setProfileImage(file);
    };

    const handleUpdateAccount = async (event) => {
        event.preventDefault();

        try {
            // Check if the new password matches the confirmed password
            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match");
                return;
            } else {
                setPasswordError('');
            }

            const auth = getAuth(); // Get Firebase auth instance

            // Update profile information
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: initialProfileImageUrl // Retain the original profile image URL if not updated
            });

            // Check if a new profile image is selected and upload it
            if (profileImage) {
                const storageRef = ref(storage, `profileImages/${profileImage.name}`);
                await uploadBytes(storageRef, profileImage);
                const downloadUrl = await getDownloadURL(storageRef);
                // Update profile image URL in the Firebase auth user object
                await updateProfile(auth.currentUser, {
                    photoURL: downloadUrl
                });
            }

            if (password) {
                await updatePassword(auth.currentUser, password);
            }

            localStorage.setItem('name', name);
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            console.log("Profile updated successfully");
            window.location.href = '/account';
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevVisible) => !prevVisible); // Toggle password visibility state
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                        {passwordError && <p className="text-danger">{passwordError}</p>}
                    </Form.Group>
                    <Form.Group controlId="formProfileImage" className="mb-3">
                        <Form.Label>Upload Profile Photo:</Form.Label>
                        <Form.Control type="file" onChange={handleProfileImageChange} />
                    </Form.Group>
                    <button type="submit" className='bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded'>Update Account</button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default EditAccount;
