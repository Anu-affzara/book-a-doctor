import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    // 
    
    <div className="landing-page">
            <header>
                <nav>
                <h1>MediCare Book</h1>
                <div className='nav-links'>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    </div>
                </nav>
            </header>
            <main>
                <div className='container'>
                <div className="image-container">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-doctor-illustration-download-in-svg-png-gif-file-formats--physician-expert-treatment-pack-medical-professionals-illustrations-4431683.png?f=webp" alt="Online-doctor-Consultation-image" />
                </div>
                <div className="text-container">
                    <h2>Consult a Doctor Today!</h2>
                    <p>Your health is our priority. Easily book your appointments with qualified doctors at your convenience.</p>
                    <Link to="/register">
                    <button>Consult Now</button>
                    </Link>
                </div>
                </div>
            </main>
            <footer>
                <p>© 2024 Book a Doctor. All rights reserved.</p>
            </footer>
        </div>
  );
};

export default LandingPage;
