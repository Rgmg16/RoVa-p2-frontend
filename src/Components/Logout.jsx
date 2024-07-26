// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext'; // Import AuthContext

// function Logout() {
//   const { setIsLoggedIn } = useContext(AuthContext); // Use setIsLoggedIn from AuthContext
//   const [error, setError] = useState('');

//   const handleSignOut = async () => {
//     try {
//       // Send a logout request to your Django backend if needed
//       await fetch('http://localhost:8000/api/logout/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Include credentials (cookies) in the request
//         body: JSON.stringify({}),
//       });

//       // Update authentication state
//       setIsLoggedIn(false);

//       // Redirect to the homepage after logout
//       window.location.href = '/'; // Redirect to the homepage using JavaScript
//     } catch (error) {
//       setError('Failed to log out. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <p className='font-bold text-green-500'><u>See you soon RoVa-neer👋!</u></p>
//       <button className='bg-red-600 hover:bg-red-500 text-cyan-300 hover:text-cyan-200 py-2 px-4 rounded' onClick={handleSignOut}>Log Out</button>
//       {error && <p className="text-danger">{error}</p>}
//     </div>
//   );
// }

// export default Logout;

import React, { useContext,useState } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

function Logout() {
    const { logout } = useContext(AuthContext); // Use logout from AuthContext
    const [error, setError] = useState('');

    const handleSignOut = async () => {
        try {
            await logout(); // Call logout function from AuthContext
            window.location.href = '/'; // Redirect to the homepage after logout
        } catch (error) {
            setError('Failed to log out. Please try again.');
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
