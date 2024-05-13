import React from 'react';
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

function Nav() {
    return (
        <div>
            
                <nav className="bg-green-700  w-full flex justify-end">
                    <ul className="flex gap-4 mr-4">
                        <li>
                            <Link to="/" className="text-cyan-300 hover:text-cyan-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/application" className="text-cyan-300 hover:text-cyan-200">Application</Link>
                        </li>
                        <li>
                            <Link to="/challenges" className="text-cyan-300 hover:text-cyan-200">Challenges</Link>
                        </li>
                        <li>
                            <Link to="/community" className="text-cyan-300 hover:text-cyan-200">Community</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-cyan-300 hover:text-cyan-200">Contact</Link>
                        </li>
                        <li>
                            <Link to="/news" className="text-cyan-300 hover:text-cyan-200">News</Link>
                        </li>
                        <li>
                            <Link to="/suggestions" className="text-cyan-300 hover:text-cyan-200">Suggestions</Link>
                        </li>
                    </ul>
                    <Dropdown />
                </nav>
            


            <Routes>
                <Route path="/" exact element={<Home />} />
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
            </Routes>


        </div >

    );
}

export default Nav;



