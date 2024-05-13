import React, { useState } from 'react';
import { Card, Form, FloatingLabel } from 'react-bootstrap';
import cx from 'classnames'
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import Account from './Account'

const firebaseConfig = {
    apiKey: "AIzaSyDGhMpCRK7g2sg3c1T3h4ljIuDKoCSC4YQ",
    authDomain: "rova-a8ab1.firebaseapp.com",
    projectId: "rova-a8ab1",
    storageBucket: "rova-a8ab1.appspot.com",
    messagingSenderId: "788700947528",
    appId: "1:788700947528:web:c9643b12ff5117b067e47d",
    measurementId: "G-LVCLLP6ZZE"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState(`rovaneer-${Math.random().toString(36).substr(2, 9)}`); // Default username
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [redirectToAccount, setRedirectToAccount] = useState(false);

    const handleSignUp = async () => {
        try {
            // Password validation
            if (password !== confirmPassword) {
                setError("Passwords don't match");
                return;
            }
            if (password.length < 7 || password.length > 16 || !/[a-zA-Z]/.test(password) || !/\d|\W/.test(password)) {
                setError('Password must be 7-16 characters and contain letters and numbers/special characters');
                return;
            }

            // Firebase sign up
            await createUserWithEmailAndPassword(auth, email, password);
            // User signed up successfully
            setError('');
            localStorage.setItem('name', name);
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            
            setRedirectToAccount(true)
        } catch (error) {
            setError(error.message);
        }
    };

    if (redirectToAccount) {
        // Redirect to account page
        return <AccountRedirect />;
    }

    return (
        <Card className="mx-auto mt-5" style={{ width: '18rem', height: '34rem', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
            <Card.Body>
                <Card.Title><u>Become a RoVa-neer!</u></Card.Title>
                <FloatingLabel controlId="formName" label="Name:" className='mb-3'>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="formUsername" label="Username:" className='mb-3'>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="formBasicEmail" label="Email:" className='mb-3'>
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="formBasicPassword" label="Password:" className='mb-3'>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </FloatingLabel>
                <FloatingLabel controlId="formConfirmPassword" label="Confirm Password:" className='mb-3'>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Form.Check
                        type="checkbox"
                        id="showPassword"
                        label="Show Password"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                </FloatingLabel>

                <button type="submit" className={cx('bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded', 'mb-3', 'mr-3')} onClick={handleSignUp}>Sign Up</button>
                {error && <p className="mt-3 text-danger">{error}</p>}
                {redirectToAccount && <AccountRedirect />}
            </Card.Body>
        </Card>
    );
}

const AccountRedirect = () => {
    window.location.href = '/account';
    return null;
}

export default Signup;