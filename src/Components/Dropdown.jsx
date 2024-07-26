import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import Account from './Account';
import Logout from './Logout';

const DropDown = () => {
    const { isAuthenticated } = useContext(AuthContext); 

    return (
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/account">My Account</Dropdown.Item>
                <Dropdown.Divider />
                {isAuthenticated ? (
                    <Dropdown.Item as={Link} to="/logout" style={{ color: 'red' }}>Logout</Dropdown.Item>
                ) : (
                    <>
                        <Dropdown.Item as={Link} to="/signup" style={{ color: 'green' }}>Sign Up</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/login" style={{ color: 'green' }}>Login</Dropdown.Item>
                    </>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropDown;


