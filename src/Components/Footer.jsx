import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function Footer() {
  return (
    <footer className='bg-gray-700 py-4 mt-8' style={{ color: 'cyan' }}>
      <div className="container mx-auto text-center">
        <Nav className="justify-content-center">
          <Nav.Link
            as={Link}
            to="/"
            style={{ color: '#F9FAFB', textDecoration: 'none', margin: '0 10px' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#93C6E5'}
            onMouseOut={(e) => e.currentTarget.style.color = '#F9FAFB'}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/application"
            style={{ color: '#F9FAFB', textDecoration: 'none', margin: '0 10px' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#93C6E5'}
            onMouseOut={(e) => e.currentTarget.style.color = '#F9FAFB'}
          >
            Application
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/volunteers"
            style={{ color: '#F9FAFB', textDecoration: 'none', margin: '0 10px' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#93C6E5'}
            onMouseOut={(e) => e.currentTarget.style.color = '#F9FAFB'}
          >
            Volunteers
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/challenges"
            style={{ color: '#F9FAFB', textDecoration: 'none', margin: '0 10px' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#93C6E5'}
            onMouseOut={(e) => e.currentTarget.style.color = '#F9FAFB'}
          >
            Challenges
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/community"
            style={{ color: '#F9FAFB', textDecoration: 'none', margin: '0 10px' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#93C6E5'}
            onMouseOut={(e) => e.currentTarget.style.color = '#F9FAFB'}
          >
            Community
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/contact"
            style={{ color: '#F9FAFB', textDecoration: 'none', margin: '0 10px' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#93C6E5'}
            onMouseOut={(e) => e.currentTarget.style.color = '#F9FAFB'}
          >
            Contact
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/news"
            style={{ color: '#F9FAFB', textDecoration: 'none', margin: '0 10px' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#93C6E5'}
            onMouseOut={(e) => e.currentTarget.style.color = '#F9FAFB'}
          >
            News
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/suggestions"
            style={{ color: '#F9FAFB', textDecoration: 'none', margin: '0 10px' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#93C6E5'}
            onMouseOut={(e) => e.currentTarget.style.color = '#F9FAFB'}
          >
            Suggestions
          </Nav.Link>
        </Nav>
        <div className="mt-4">
          Copyright &copy; 2024 RoVa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
