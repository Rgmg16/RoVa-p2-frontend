import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import man1 from './man-1.jpg';
import man2 from './man-2.jpg';
import man3 from './man-3.jpg';
import man4 from './man-4.jpg';
import woman1 from './woman-1.jpg';
import woman2 from './woman-2.jpg';
import woman3 from './woman-3.jpg';
import woman4 from './woman-4.jpg';

function Volunteers() {
    const [searchQuery, setSearchQuery] = useState('');

    const volunteersData = [
        { image: man1, fullName: 'John Doe', email: 'john.doe@example.com', phoneNumber: '(123) 456-7890', age: 30, idNumber: 'V001', description: 'I am able to take one through job application and public relations' },
        { image: woman1, fullName: 'Jane Smith', email: 'jane.smith@example.com', phoneNumber: '(234) 567-8901', age: 28, idNumber: 'V002', description: 'I am well versed in translation and job application' },
        { image: man2, fullName: 'Michael Johnson', email: 'michael.johnson@example.com', phoneNumber: '(345) 678-9012', age: 35, idNumber: 'V003', description: 'I am able to take one through public relations as well as translation' },
        { image: woman2, fullName: 'Emily Davis', email: 'emily.davis@example.com', phoneNumber: '(456) 789-0123', age: 27, idNumber: 'V004', description: 'I can take one through leadership as well as counselling' },
        { image: man3, fullName: 'David Martinez', email: 'david.martinez@example.com', phoneNumber: '(567) 890-1234', age: 32, idNumber: 'V005', description: 'I am well versed in counselling and also I can take one through leadership' },
        { image: woman3, fullName: 'Sarah Wilson', email: 'sarah.wilson@example.com', phoneNumber: '(678) 901-2345', age: 29, idNumber: 'V006', description: 'I am able to take one through public communication as well as help one to build their skillset' },
        { image: man4, fullName: 'James Brown', email: 'james.brown@example.com', phoneNumber: '(789) 012-3456', age: 40, idNumber: 'V007', description: 'I can help one through counselling as well as job application' },
        { image: woman4, fullName: 'Jessica Taylor', email: 'jessica.taylor@example.com', phoneNumber: '(890) 123-4567', age: 26, idNumber: 'V008', description: 'I can help one to be a confident public speaker and also have good public relations' }
    ];

    const filteredVolunteers = volunteersData.filter(volunteer =>
        volunteer.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                {filteredVolunteers.map((volunteer, index) => (
                    <Card key={index} className="mx-auto mb-4" style={{ width: '18rem', height: '35rem', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
                        <Card.Img variant="top" src={volunteer.image} />
                        <Card.Body>
                            <Card.Title><u>Volunteer Information</u></Card.Title>
                            <Card.Text>
                                <b>Full Name:</b> {volunteer.fullName}<br />
                                <b>Email:</b> {volunteer.email}<br />
                                <b>Phone Number:</b> {volunteer.phoneNumber}<br />
                                <b>Age:</b> {volunteer.age}<br />
                                <b>ID Number:</b> {volunteer.idNumber}<br />
                                <b>Description:</b> {volunteer.description}<br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Volunteers;
