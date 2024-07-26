// import React, { useState, useContext } from 'react';
// import { Card, Form, FloatingLabel } from 'react-bootstrap';
// import cx from 'classnames';
// import { AuthContext } from '../context/AuthContext';

// function Login() {
//     const { csrfToken, login, setIsAuthenticated } = useContext(AuthContext);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);

//     const handleSignIn = async () => {
//         try {
//             await login(email, password); // Use AuthContext's login function

//             // If login is successful, authentication state is updated within the login function
//             setIsAuthenticated(true); // This line is now redundant as `login` already updates the state
//             setError('');
//             window.location.href = '/'; // Redirect to homepage or dashboard
//         } catch (error) {
//             console.error('Login error:', error);
//             setError(error.response ? error.response.data.error || error.response.data.detail : error.message);
//         }
//     };

//     return (
//         <Card className="mx-auto mt-5" style={{ width: '18rem', height: '25rem', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
//             <Card.Body>
//                 <Card.Title><u>Welcome back RoVa-neer!</u></Card.Title>
//                 <FloatingLabel controlId="formBasicEmail" label="Email:" className="mb-3">
//                     <Form.Control 
//                         type="email" 
//                         placeholder="Email" 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)} 
//                     />
//                 </FloatingLabel>
//                 <FloatingLabel controlId="formBasicPassword" label="Password:" className="mb-3">
//                     <Form.Control 
//                         type={showPassword ? 'text' : 'password'} 
//                         placeholder="Password" 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                     />
//                 </FloatingLabel>
//                 <Form.Check
//                     type="checkbox"
//                     className="mb-3"
//                     id="showPassword"
//                     label="Show Password"
//                     checked={showPassword}
//                     onChange={() => setShowPassword(!showPassword)}
//                 />
//                 <button 
//                     type="button" 
//                     className={cx('bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded', 'mb-3')} 
//                     onClick={handleSignIn}
//                 >
//                     Log In
//                 </button>
//                 {error && <p className="mt-3 text-danger">{error}</p>}
//             </Card.Body>
//         </Card>
//     );
// }

// export default Login;

import React, { useState, useContext } from 'react';
import { Card, Form, FloatingLabel } from 'react-bootstrap';
import cx from 'classnames';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const { csrfToken, login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async () => {
        try {
            await login(email, password); // Use AuthContext's login function
            setError('');
            window.location.href = '/'; // Redirect to homepage or dashboard
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response ? error.response.data.error || error.response.data.detail : error.message);
        }
    };

    return (
        <Card className="mx-auto mt-5" style={{ width: '18rem', height: '25rem', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
            <Card.Body>
                <Card.Title><u>Welcome back RoVa-neer!</u></Card.Title>
                <FloatingLabel controlId="formBasicEmail" label="Email:" className="mb-3">
                    <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </FloatingLabel>
                <FloatingLabel controlId="formBasicPassword" label="Password:" className="mb-3">
                    <Form.Control 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </FloatingLabel>
                <Form.Check
                    type="checkbox"
                    className="mb-3"
                    id="showPassword"
                    label="Show Password"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                />
                <button 
                    type="button" 
                    className={cx('bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded', 'mb-3')} 
                    onClick={handleSignIn}
                >
                    Log In
                </button>
                {error && <p className="mt-3 text-danger">{error}</p>}
            </Card.Body>
        </Card>
    );
}

export default Login;
