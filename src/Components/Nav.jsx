import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Application from './Application';
import Challenges from './Challenges';
import Community from './Community';
import Contact from './Contact';
import Home from './Home';
import News from './News';
import Suggestions from './Suggestions';
import Dropdown from './Dropdown';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import Account from './Account';
import EditAccount from './Editaccount';
import Volunteers from './Volunteers';

function Navi() {
    const [expanded, setExpanded] = useState(false);

    const handleNavClick = () => {
        setExpanded(false);
    };

    return (
        <div>
            <Navbar className="bg-green-700" expand="lg" expanded={expanded}>
                <Container>
                    <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
                        RoVa
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setExpanded(!expanded)} />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" onClick={handleNavClick}><u>Home</u></Nav.Link>
                            <Nav.Link as={Link} to="/application" onClick={handleNavClick}><u>Application</u></Nav.Link>
                            <Nav.Link as={Link} to="/volunteers" onClick={handleNavClick}><u>Volunteers</u></Nav.Link>
                            <Nav.Link as={Link} to="/challenges" onClick={handleNavClick}><u>Challenges</u></Nav.Link>
                            <Nav.Link as={Link} to="/community" onClick={handleNavClick}><u>Community</u></Nav.Link>
                            <Nav.Link as={Link} to="/contact" onClick={handleNavClick}><u>Contact</u></Nav.Link>
                            <Nav.Link as={Link} to="/news" onClick={handleNavClick}><u>News</u></Nav.Link>
                            <Nav.Link as={Link} to="/suggestions" onClick={handleNavClick}><u>Suggestions</u></Nav.Link>
                        </Nav>
                        <Dropdown />
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/application" element={<Application />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/community" element={<Community />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/suggestions" element={<Suggestions />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/account" element={<Account />} />
                <Route path="/edit-account" element={<EditAccount />} />
                <Route path="/volunteers" element={<Volunteers />} />
            </Routes>
        </div>
    );
}

export default Navi;
