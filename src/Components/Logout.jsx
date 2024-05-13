import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app'; 

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

const auth = getAuth();

function Logout() {
  const [error, setError] = useState('');

  const handleSignOut = async () => {
    try {
      await signOut(auth);
        
      // User signed out successfully
      setError('');
      // Redirect to the homepage after logout
      window.location.href = '/'; // Redirect to the homepage using JavaScript
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <p className='font-bold text-green-500'><u>See you soon RoVa-neer👋!</u></p>
      <button className='bg-red-600 hover:bg-red-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded' onClick={handleSignOut}>Log Out</button>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default Logout;
