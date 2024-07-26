// import React, { useState, useContext } from 'react';
// import { Card, Form, FloatingLabel } from 'react-bootstrap';
// import cx from 'classnames';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';

// function Signup() {
//     const { login, csrfToken } = useContext(AuthContext);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [username, setUsername] = useState(`rovaneer-${Math.random().toString(36).substr(2, 9)}`);
//     const [name, setName] = useState('');
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [redirectToAccount, setRedirectToAccount] = useState(false);

//     const handleSignUp = async () => {
//         try {
//             // Validate passwords
//             if (password !== confirmPassword) {
//                 setError("Passwords don't match");
//                 return;
//             }
//             if (password.length < 7 || password.length > 16 || !/[a-zA-Z]/.test(password) || !/\d|\W/.test(password)) {
//                 setError('Password must be 7-16 characters and contain letters and numbers/special characters');
//                 return;
//             }

//             const userData = {
//                 username,
//                 email,
//                 password,
//                 confirm_password: confirmPassword,
//                 name,
//             };

//             // Sign up the user with CSRF token in the headers
//             await axios.post('http://localhost:8000/api/register/', userData, {
//                 headers: { 'X-CSRFToken': csrfToken }, // Include CSRF token in headers
//                 withCredentials: true,
//             });

//             // Log in the user after successful signup
//             try {
//                 await login(email, password);
//                 setRedirectToAccount(true); // Set state to trigger redirect
//             } catch (loginError) {
//                 console.error('Login error after signup:', loginError);
//                 setError('Signup successful but login failed. Please try logging in manually.');
//             }

//             setError('');
//         } catch (error) {
//             console.error('Signup error:', error);
//             if (error.response) {
//                 console.error('Response data:', error.response.data);
//                 setError(error.response.data.detail || 'An error occurred during signup.');
//             } else {
//                 setError(error.message);
//             }
//         }
//     };

//     if (redirectToAccount) {
//         // Redirect to account page
//         window.location.href = '/account';
//         return null;
//     }

//     return (
//         <Card className="mx-auto mt-5" style={{ width: '18rem', height: '34rem', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
//             <Card.Body>
//                 <Card.Title><u>Become a RoVa-neer!</u></Card.Title>
//                 <FloatingLabel controlId="formName" label="Name:" className="mb-3">
//                     <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//                 </FloatingLabel>
//                 <FloatingLabel controlId="formUsername" label="Username:" className="mb-3">
//                     <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//                 </FloatingLabel>
//                 <FloatingLabel controlId="formBasicEmail" label="Email:" className="mb-3">
//                     <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </FloatingLabel>
//                 <FloatingLabel controlId="formBasicPassword" label="Password:" className="mb-3">
//                     <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </FloatingLabel>
//                 <FloatingLabel controlId="formConfirmPassword" label="Confirm Password:" className="mb-3">
//                     <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//                     <Form.Check
//                         type="checkbox"
//                         id="showPassword"
//                         label="Show Password"
//                         checked={showPassword}
//                         onChange={() => setShowPassword(!showPassword)}
//                     />
//                 </FloatingLabel>

//                 <button
//                     type="button"
//                     className={cx('bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded', 'mb-3', 'mr-3')}
//                     onClick={handleSignUp}
//                 >
//                     Sign Up
//                 </button>
//                 {error && <p className="mt-3 text-danger">{error}</p>}
//             </Card.Body>
//         </Card>
//     );
// }

// export default Signup;

import React, { useState, useContext } from 'react';
import { Card, Form, FloatingLabel } from 'react-bootstrap';
import cx from 'classnames';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Signup() {
    const { login, csrfToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState(`rovaneer-${Math.random().toString(36).substr(2, 9)}`);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [redirectToAccount, setRedirectToAccount] = useState(false);

    const handleSignUp = async () => {
        try {
            // Validate passwords
            if (password !== confirmPassword) {
                setError("Passwords don't match");
                return;
            }
            if (password.length < 7 || password.length > 16 || !/[a-zA-Z]/.test(password) || !/\d|\W/.test(password)) {
                setError('Password must be 7-16 characters and contain letters and numbers/special characters');
                return;
            }

            const userData = {
                username,
                email,
                password,
                confirm_password: confirmPassword,
                name,
            };

            // Sign up the user with CSRF token in the headers
            await axios.post('http://localhost:8000/api/register/', userData, {
                headers: { 'X-CSRFToken': csrfToken }, // Include CSRF token in headers
                withCredentials: true,
            });

            // Log in the user after successful signup
            await login(email, password);
            setRedirectToAccount(true); // Set state to trigger redirect

            setError('');
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response) {
                setError(error.response.data.detail || 'An error occurred during signup.');
            } else {
                setError(error.message);
            }
        }
    };

    if (redirectToAccount) {
        // Redirect to account page
        window.location.href = '/account';
        return null;
    }

    return (
        <Card className="mx-auto mt-5" style={{ width: '18rem', height: '34rem', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
            <Card.Body>
                <Card.Title><u>Become a RoVa-neer!</u></Card.Title>
                <FloatingLabel controlId="formName" label="Name:" className="mb-3">
                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="formUsername" label="Username:" className="mb-3">
                    <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="formBasicEmail" label="Email:" className="mb-3">
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="formBasicPassword" label="Password:" className="mb-3">
                    <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="formConfirmPassword" label="Confirm Password:" className="mb-3">
                    <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Form.Check
                        type="checkbox"
                        id="showPassword"
                        label="Show Password"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                </FloatingLabel>

                <button
                    type="button"
                    className={cx('bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded', 'mb-3', 'mr-3')}
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
                {error && <p className="mt-3 text-danger">{error}</p>}
            </Card.Body>
        </Card>
    );
}

export default Signup;
