import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { storage } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';
import cx from 'classnames'
import useAuth from './Custom Hooks/Useauth';

const Account = () => {
    const { isLoggedIn } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            // Fetch data from localStorage
            const storedName = localStorage.getItem('name');
            const storedEmail = localStorage.getItem('email');
            const storedUsername = localStorage.getItem('username');
            const storedProfileImageUrl = localStorage.getItem('profileImageUrl');
            
            // Update state with fetched data
            setName(storedName || '');
            setEmail(storedEmail || '');
            setUsername(storedUsername || '');
            setProfileImageUrl(storedProfileImageUrl || '');
        } else {
            // Set fields to default "Sign in/Log in first" if not authenticated
            setName('Sign in/Log in first');
            setEmail('Sign in/Log in first');
            setUsername('Sign in/Log in first');
            setProfileImageUrl('');
        }
    }, [isLoggedIn]);

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

            // Create a storage reference to upload the file
            const storageRef = ref(storage, `profileImages/${profileImage.name}`);

            // Upload the file to Firebase Storage
            await uploadBytes(storageRef, profileImage);

            // Get the download URL of the uploaded file
            const downloadUrl = await getDownloadURL(storageRef);

            // Update the profile image URL in the localStorage
            localStorage.setItem('profileImageUrl', downloadUrl);

            // Update the profileImageUrl state
            setProfileImageUrl(downloadUrl);

            // Clear the profileImage state after successful upload
            setProfileImage(null);

            console.log("Profile image uploaded successfully:", downloadUrl);
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
                
                {profileImageUrl && (
                    <div>
                        <img src={profileImageUrl} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    </div>
                )}
                <Form.Group controlId="formProfileImage" className="mb-3">
                    <Form.Label>Upload Profile Photo</Form.Label>
                    <Form.Control type="file" onChange={handleProfileImageChange} />
                </Form.Group>
                <button className={cx('bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded', 'mb-3', 'mr-3')} onClick={handleUploadProfileImage}>Upload</button>
            </Card.Body>
            <div className="card-footer">
                <Link to="/edit-account" className="text-green-600 hover:text-green-500">Edit Account</Link>
            </div>
        </Card>
    );
}

export default Account;

