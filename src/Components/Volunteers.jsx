import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import { Link } from 'react-router-dom'; // Import Link for navigation

function Volunteers() {
    const [volunteersData, setVolunteersData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingVolunteer, setEditingVolunteer] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [imageFile, setImageFile] = useState(null); // State for image file
    const [removeImage, setRemoveImage] = useState(false); // State to track if image is removed
    const { token, csrfToken, isAuthenticated } = useContext(AuthContext); // Access token, CSRF token, and authentication state

    // Default profile image URL
    const defaultProfileImage = 'RoVa.png';

    // Fetch volunteers data from the API
    useEffect(() => {
        if (!isAuthenticated) return; // Do not fetch data if not authenticated

        const fetchVolunteers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/volunteer/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`, // Use token for authentication
                        'X-CSRFToken': csrfToken, // Include CSRF token if applicable
                    },
                    credentials: 'include', // Include cookies for session-based authentication
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.error('Error fetching volunteers:', errorResponse);
                    throw new Error('Failed to fetch volunteers');
                }

                const data = await response.json();
                setVolunteersData(data);
            } catch (error) {
                console.error('Error fetching volunteers:', error);
            }
        };

        fetchVolunteers();
    }, [token, csrfToken, isAuthenticated]); // Dependency array includes isAuthenticated

    const handleEditClick = (volunteer) => {
        setEditingVolunteer(volunteer);
        setEditFormData({
            full_name: volunteer.full_name,
            email: volunteer.email,
            phone_number: volunteer.phone_number,
            age: volunteer.age,
            id_number: volunteer.id_number,
            description: volunteer.description,
        });
        setImageFile(null); // Reset image file state
        setRemoveImage(false); // Reset remove image state
    };

    const handleEditChange = (e) => {
        const { id, value } = e.target;
        setEditFormData({ ...editFormData, [id]: value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        setRemoveImage(false); // Ensure image removal state is reset
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setRemoveImage(true); // Mark image as removed
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // Append regular fields
        for (const key in editFormData) {
            formData.append(key, editFormData[key]);
        }
        // Append image file if available or if removed image is not marked
        if (imageFile) {
            formData.append('profile_photo', imageFile);
        } else if (removeImage) {
            formData.append('remove_profile_photo', 'true'); // Optional: Adjust based on your API's handling of image removal
        }

        try {
            const response = await fetch(`http://localhost:8000/api/volunteer/${editingVolunteer.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`, // Use token for authentication
                    'X-CSRFToken': csrfToken, // Include CSRF token if applicable
                },
                credentials: 'include', // Include cookies for session-based authentication
                body: formData,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error updating volunteer:', errorResponse);
                throw new Error('Failed to update volunteer');
            }

            // Update local state
            const updatedVolunteer = await response.json();
            setVolunteersData(volunteersData.map(v => (v.id === updatedVolunteer.id ? updatedVolunteer : v)));
            setEditingVolunteer(null);
            setImageFile(null); // Reset image file state
            setRemoveImage(false); // Reset remove image state
        } catch (error) {
            console.error('Error updating volunteer:', error);
        }
    };

    const filteredVolunteers = volunteersData.filter(volunteer =>
        volunteer.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isAuthenticated) {
        return (
            <div className='mt-8' style={{ textAlign: 'center' }}>
                <p>
                    <Link to="/signup">Sign Up</Link> or <Link to="/login">Log In</Link> to see the list of volunteers.
                </p>
            </div>
        );
    }

    return (
        <div className='mt-8'>
            <input
                type="text"
                placeholder="Search by description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '5px',
                    border: '2px solid #48BB78', // Green-500 border
                    borderRadius: '10px', // Rounded ends
                    outline: 'none', // Remove default focus outline
                }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '20px', justifyContent: 'center' }}>
                {filteredVolunteers.map((volunteer) => (
                    <Card key={volunteer.id} className="mx-auto mb-4" style={{ width: '18rem', height: '37rem', backgroundColor: 'green', color: 'white', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
                        <Card.Img 
                            variant="top" 
                            src={volunteer.profile_photo || defaultProfileImage} 
                            alt="Profile"
                        /> {/* Use default image if profile_photo is missing */}
                        <Card.Body>
                            <Card.Title><i>~ Volunteer Information ~</i></Card.Title>
                            {editingVolunteer && editingVolunteer.id === volunteer.id ? (
                                <Form onSubmit={handleEditSubmit}>
                                    <Form.Group controlId="full_name">
                                        <Form.Label>Full Name:</Form.Label>
                                        <Form.Control type="text" value={editFormData.full_name} onChange={handleEditChange} />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control type="email" value={editFormData.email} onChange={handleEditChange} />
                                    </Form.Group>
                                    <Form.Group controlId="phone_number">
                                        <Form.Label>Phone Number:</Form.Label>
                                        <Form.Control type="tel" value={editFormData.phone_number} onChange={handleEditChange} />
                                    </Form.Group>
                                    <Form.Group controlId="age">
                                        <Form.Label>Age:</Form.Label>
                                        <Form.Control type="number" value={editFormData.age} onChange={handleEditChange} />
                                    </Form.Group>
                                    <Form.Group controlId="id_number">
                                        <Form.Label>ID Number:</Form.Label>
                                        <Form.Control type="text" value={editFormData.id_number} onChange={handleEditChange} />
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>Description:</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={editFormData.description} onChange={handleEditChange} />
                                    </Form.Group>
                                    <Form.Group controlId="profile_photo">
                                        <Form.Label>Profile Photo:</Form.Label>
                                        <Form.Control 
                                            type="file" 
                                            onChange={handleImageChange} 
                                            accept="image/*"
                                        />
                                        {volunteer.profile_photo && !removeImage && (
                                            <div>
                                                <img 
                                                    src={volunteer.profile_photo} 
                                                    alt="Current Profile" 
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} 
                                                />
                                                <Button 
                                                    variant="danger" 
                                                    onClick={handleRemoveImage} 
                                                    style={{ marginTop: '10px' }}
                                                >
                                                    Remove Image
                                                </Button>
                                            </div>
                                        )}
                                    </Form.Group>
                                    <Button type="submit" variant="success">Save</Button>
                                    <Button variant="secondary" onClick={() => setEditingVolunteer(null)}>Cancel</Button>
                                </Form>
                            ) : (
                                <>
                                    <Card.Text>
                                        <b>Full Name:</b> {volunteer.full_name}<br />
                                        <b>Email:</b> {volunteer.email}<br />
                                        <b>Phone Number:</b> {volunteer.phone_number}<br />
                                        <b>Age:</b> {volunteer.age}<br />
                                        <b>ID Number:</b> {volunteer.id_number}<br />
                                        <b>Description:</b> {volunteer.description}<br />
                                    </Card.Text>
                                    <Button onClick={() => handleEditClick(volunteer)} variant="primary">Edit</Button>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Volunteers;
