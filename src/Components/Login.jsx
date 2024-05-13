import React, { useState, useEffect } from 'react';
import { Card, Form, FloatingLabel } from 'react-bootstrap';
import cx from 'classnames'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebase from 'firebase/compat/app'; // Import the firebase module
import 'firebase/compat/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  useEffect(() => {
    // Check if the user logged in using Google previously
    const storedIsGoogleLogin = localStorage.getItem('isGoogleLogin') === 'true';
    setIsGoogleLogin(storedIsGoogleLogin);
  }, []);

  const handleSignIn = async () => {
    try {
      if (isGoogleLogin) {
        // If previously logged in with Google, reset isGoogleLogin state and return
        setIsGoogleLogin(false);
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
      setError('');
      const storedName = localStorage.getItem('name');
      const storedUsername = localStorage.getItem('username');
      const storedEmail = localStorage.getItem('email');
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // User signed in successfully
      setError('');
      localStorage.setItem('isGoogleLogin', 'true');
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card className="mx-auto mt-5" style={{ width: '18rem', height: '30rem', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
      <Card.Body>
        <Card.Title><u>Welcome back RoVa-neer!</u></Card.Title>
        <FloatingLabel controlId="formBasicEmail" label="Email:" className='mb-3'>
          <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel controlId="formBasicPassword" label="Password:" className='mb-3'>
          <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FloatingLabel>
        <Form.Check
          type="checkbox"
          className='mb-3'
          id="showPassword"
          label="Show Password"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <button type="submit" className={cx('bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded', 'mb-3')} onClick={handleSignIn}>Log In</button>
        <p>OR</p>
        <button className={cx('bg-green-600 hover:bg-green-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded', 'mb-3')} onClick={handleSignInWithGoogle}>
          <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '5px' }} />
          Log In using Google
        </button>
        {error && <p className="mt-3 text-danger">{error}</p>}
      </Card.Body>
    </Card>
  );
}

export default Login;
