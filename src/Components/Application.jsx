// import React, { useState } from 'react';
// import { Form, FloatingLabel, Card } from 'react-bootstrap';
// import cx from 'classnames';

// function Application() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     age: '',
//     idNumber: '',
//     description: '',
//   });
//   const [profilePhoto, setProfilePhoto] = useState(null); // State to hold the selected profile photo

//   const handleChange = (e) => {
//     if (e.target.type === 'file') {
//       setProfilePhoto(e.target.files[0]); // Update the profile photo state
//     } else {
//       setFormData({ ...formData, [e.target.id]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('https://formspree.io/f/mwkgyygy', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to submit form');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }

//     const card = (
//       <Card className="mb-3">
//         {/* Display profile picture in the top and center of the card */}
//         {profilePhoto && (
//           <div className="text-center">
//             <img src={URL.createObjectURL(profilePhoto)} alt="Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} />
//           </div>
//         )}
//         <Card.Body>
//           <Card.Title>{formData.fullName}</Card.Title>
//           <Card.Subtitle className="mb-2 text-muted">{formData.email}</Card.Subtitle>
//           <Card.Text>
//             Phone Number: {formData.phoneNumber}<br />
//             Age: {formData.age}<br />
//             ID Number: {formData.idNumber}<br />
//             Description: {formData.description}
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     );

//     setFormData({
//       fullName: '',
//       email: '',
//       phoneNumber: '',
//       age: '',
//       idNumber: '',
//       description: '',
//     });
//     setProfilePhoto(null); // Reset the profile photo state after submission

//     document.getElementById('card-container').appendChild(card);
//   };


//   return (
//     <div className="max-w-md mx-auto p-6 rounded-lg mt-8" style={{ backgroundColor: 'cyan', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
//       <h1 className="text-green-400 text-3xl font-bold mb-4 underline">Apply Here to become a RoVa-neer volunteeer!</h1>
//       <Form onSubmit={handleSubmit}>

//         <FloatingLabel controlId="fullName" label="Full Name:" className="mb-3 text-green-500">
//           <Form.Control type="text" placeholder="Enter your full name..." value={formData.fullName} onChange={handleChange} />
//         </FloatingLabel>

//         <FloatingLabel controlId="email" label="Email Address:" className="mb-3 text-green-500">
//           <Form.Control type="email" placeholder="Enter your email address..." value={formData.email} onChange={handleChange} />
//         </FloatingLabel>

//         <FloatingLabel controlId="phoneNumber" label="Phone Number:" className="mb-3 text-green-500">
//           <Form.Control type="tel" placeholder="Enter your phone number..." value={formData.phoneNumber} onChange={handleChange} />
//         </FloatingLabel>

//         <FloatingLabel controlId="age" label="Age:" className="mb-3 text-green-500">
//           <Form.Control type="number" placeholder="Enter your age..." value={formData.age} onChange={handleChange} />
//         </FloatingLabel>

//         <FloatingLabel controlId="idNumber" label="ID Number:" className="mb-3 text-green-500">
//           <Form.Control type="text" placeholder="Enter your ID number..." value={formData.idNumber} onChange={handleChange} />
//         </FloatingLabel>

//         <FloatingLabel controlId="description" label="Write a description about yourself..." className="mb-3 text-green-500">
//           <Form.Control as="textarea" rows={3} placeholder="Write a description of yourself..." value={formData.description} onChange={handleChange} />
//         </FloatingLabel>

//         <Form.Group controlId="profilePhoto" className="mb-3 text-green-500 font-bold">
//           <Form.Label><u>Upload Profile Photo</u></Form.Label>
//           <Form.Control type="file" className='text-green-500' />
//         </Form.Group>

//         <Form.Group controlId="certificateUpload" className="mb-3 text-green-500 font-bold">
//           <Form.Label><u>Upload Certificate of Completion of KSL Level 3</u></Form.Label>
//           <Form.Control type="file" className='text-green-500' onChange={handleChange} />
//         </Form.Group>

//         <input type="hidden" name="_replyto" value="gumborobert7@gmail.com" />
//         <button
//           type="submit"
//           className={cx(
//             'bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded',
//             'mb-3'
//           )}
//         >
//           Submit
//         </button>

//       </Form>
//       <div id="card-container"></div>
//     </div>

//   );
// }

// export default Application;

// Application.js
import React, { useState } from 'react';
import { Form, FloatingLabel, Card } from 'react-bootstrap';
import cx from 'classnames';
import useAuth from './Custom Hooks/Useauth';

function Application() {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    age: '',
    idNumber: '',
    description: '',
  });
  const [profilePhoto, setProfilePhoto] = useState(null); // State to hold the selected profile photo

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setProfilePhoto(e.target.files[0]); // Update the profile photo state
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/mwkgyygy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    const card = (
      <Card className="mb-3">
        {/* Display profile picture in the top and center of the card */}
        {profilePhoto && (
          <div className="text-center">
            <img src={URL.createObjectURL(profilePhoto)} alt="Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </div>
        )}
        <Card.Body>
          <Card.Title>{formData.fullName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{formData.email}</Card.Subtitle>
          <Card.Text>
            Phone Number: {formData.phoneNumber}<br />
            Age: {formData.age}<br />
            ID Number: {formData.idNumber}<br />
            Description: {formData.description}
          </Card.Text>
        </Card.Body>
      </Card>
    );

    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      age: '',
      idNumber: '',
      description: '',
    });
    setProfilePhoto(null); // Reset the profile photo state after submission

    document.getElementById('card-container').appendChild(card);
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg mt-8" style={{ backgroundColor: 'cyan', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
      <h1 className="text-green-400 text-3xl font-bold mb-4 underline">Apply Here to become a RoVa-neer volunteer!</h1>
      <Form onSubmit={handleSubmit}>

        <FloatingLabel controlId="fullName" label="Full Name:" className="mb-3 text-green-500">
          <Form.Control type="text" placeholder="Enter your full name..." value={formData.fullName} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="email" label="Email Address:" className="mb-3 text-green-500">
          <Form.Control type="email" placeholder="Enter your email address..." value={formData.email} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="phoneNumber" label="Phone Number:" className="mb-3 text-green-500">
          <Form.Control type="tel" placeholder="Enter your phone number..." value={formData.phoneNumber} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="age" label="Age:" className="mb-3 text-green-500">
          <Form.Control type="number" placeholder="Enter your age..." value={formData.age} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="idNumber" label="ID Number:" className="mb-3 text-green-500">
          <Form.Control type="text" placeholder="Enter your ID number..." value={formData.idNumber} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="description" label="Write a description about yourself..." className="mb-3 text-green-500">
          <Form.Control as="textarea" rows={3} placeholder="Write a description of yourself..." value={formData.description} onChange={handleChange} />
        </FloatingLabel>

        <Form.Group controlId="profilePhoto" className="mb-3 text-green-500 font-bold">
          <Form.Label><u>Upload Profile Photo</u></Form.Label>
          <Form.Control type="file" className='text-green-500' onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="certificateUpload" className="mb-3 text-green-500 font-bold">
          <Form.Label><u>Upload Certificate of Completion of KSL Level 3</u></Form.Label>
          <Form.Control type="file" className='text-green-500' onChange={handleChange} />
        </Form.Group>

        {isLoggedIn ? (
          <button
            type="submit"
            className={cx(
              'bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded',
              'mb-3'
            )}
          >
            Submit
          </button>
        ) : (
          <p className="text-red-500">You must be logged in to apply.</p>
        )}

      </Form>
      <div id="card-container"></div>
    </div>
  );
}

export default Application;




