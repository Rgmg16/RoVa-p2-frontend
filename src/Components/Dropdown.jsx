import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  useAuth  from './Custom Hooks/Useauth';
import Account from './Account';
import Logout from './Logout';

const DropDown = () => {
    const { isLoggedIn } = useAuth(); // Assuming isLoggedIn is a state indicating whether the user is logged in

    return (
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/account">My Account</Dropdown.Item>
                <Dropdown.Divider />
                {isLoggedIn ? (
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

