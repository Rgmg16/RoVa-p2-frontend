import React from 'react'
import Card from 'react-bootstrap/Card';
import CustomerService from './Customerservice.png'

function Contact() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '18rem', height: '20rem', backgroundColor: 'cyan', color:'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)'}}>
        <Card.Img variant="top" src={CustomerService} />
        <Card.Body>
          <Card.Title><u>Contact Us!</u></Card.Title>
          <Card.Text>
            <p>Email: Info@example.com</p>
            <p>Phone no.: +254 711222333/ +254 733222111</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Contact