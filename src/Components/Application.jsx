import React, { useState, useContext } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import cx from 'classnames';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

function Application({ addVolunteer }) { // Accept addVolunteer as a prop
  const { isAuthenticated, csrfToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    age: '',
    idNumber: '',
    description: '',
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setProfilePhoto(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithPhoto = new FormData();
    formDataWithPhoto.append('full_name', formData.fullName);
    formDataWithPhoto.append('email', formData.email);
    formDataWithPhoto.append('phone_number', formData.phoneNumber);
    formDataWithPhoto.append('age', formData.age);
    formDataWithPhoto.append('id_number', formData.idNumber);
    formDataWithPhoto.append('description', formData.description);
    if (profilePhoto) {
      formDataWithPhoto.append('profile_photo', profilePhoto);
    }

    console.log(Array.from(formDataWithPhoto.entries())); // Log form data

    try {
      console.log([...formDataWithPhoto]);
      const response = await fetch('http://localhost:8000/api/volunteer/create/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
          'Accept': 'application/json',
        },
        body: formDataWithPhoto,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Get the response body
        console.error('Error:', errorResponse); // Log the error response
        throw new Error('Failed to submit form');
      }

      // Create a volunteer object
      const newVolunteer = {
        image: URL.createObjectURL(profilePhoto), // Use the profile photo
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        age: formData.age,
        idNumber: formData.idNumber,
        description: formData.description,
      };

      addVolunteer(newVolunteer); // Add the new volunteer to the shared state

      // Reset form data
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        age: '',
        idNumber: '',
        description: '',
      });
      setProfilePhoto(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg mt-8" style={{ backgroundColor: '#006600', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
      <h1 className="text-3xl font-bold mb-4 underline" style={{ color: '#93C6E5' }}>Apply Here to become a RoVa-neer volunteer!</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="fullName" label="Full Name:" className="mb-3" style={{ color: '#006600' }}>
          <Form.Control type="text" placeholder="Enter your full name..." value={formData.fullName} onChange={handleChange} style={{ color: '#006600' }} />
        </FloatingLabel>

        <FloatingLabel controlId="email" label="Email Address:" className="mb-3" style={{ color: '#006600' }}>
          <Form.Control type="email" placeholder="Enter your email address..." value={formData.email} onChange={handleChange} style={{ color: '#006600' }} />
        </FloatingLabel>

        <FloatingLabel controlId="phoneNumber" label="Phone Number:" className="mb-3" style={{ color: '#006600' }}>
          <Form.Control type="tel" placeholder="Enter your phone number..." value={formData.phoneNumber} onChange={handleChange} style={{ color: '#006600' }} />
        </FloatingLabel>

        <FloatingLabel controlId="age" label="Age:" className="mb-3" style={{ color: '#006600' }}>
          <Form.Control type="number" placeholder="Enter your age..." value={formData.age} onChange={handleChange} style={{ color: '#006600' }} />
        </FloatingLabel>

        <FloatingLabel controlId="idNumber" label="ID Number:" className="mb-3" style={{ color: '#006600' }}>
          <Form.Control type="text" placeholder="Enter your ID number..." value={formData.idNumber} onChange={handleChange} style={{ color: '#006600' }} />
        </FloatingLabel>

        <FloatingLabel controlId="description" label="Write a description about yourself..." className="mb-3" style={{ color: '#006600' }}>
          <Form.Control as="textarea" rows={3} placeholder="Write a description of yourself..." value={formData.description} onChange={handleChange} style={{ color: '#006600' }} />
        </FloatingLabel>

        <Form.Group controlId="profilePhoto" className="mb-3 font-bold">
          <Form.Label style={{ color: '#93C6E5' }}><u>Upload Profile Photo</u></Form.Label>
          <Form.Control type="file" style={{ color: '#006600' }} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="certificateUpload" className="mb-3 font-bold">
          <Form.Label style={{ color: '#93C6E5' }}><u>Upload Certificate of Completion of KSL Level 3</u></Form.Label>
          <Form.Control type="file" style={{ color: '#006600' }} onChange={handleChange} />
        </Form.Group>

        {isAuthenticated ? (
          <button
            type="submit"
            className={cx(
              'bg-cyan-500 hover:bg-cyan-700 text-green-200 hover:text-green-300 py-2 px-4 rounded',
              'mb-3'
            )}
          >
            Submit
          </button>
        ) : (
          <p style={{ color: '#93C6E5' }}>You must be logged in to apply.</p>
        )}
      </Form>
    </div>
  );
}

export default Application;
