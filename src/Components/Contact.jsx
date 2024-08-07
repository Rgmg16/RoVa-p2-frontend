import React from 'react';
import Card from 'react-bootstrap/Card';
import CustomerService from './Customerservice.png';

function Contact() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '18rem', height: '20rem', backgroundColor: 'green', color: 'white', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
        <Card.Img variant="top" src={CustomerService} />
        <Card.Body>
          <Card.Title><i>~ Contact Us! ~</i></Card.Title>
          <Card.Text>
            Email: Info@example.com <br />
            Phone no.: +254 711222333 / +254 733222111
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Contact;
