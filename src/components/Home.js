import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header>
                <div className="logo">
                    <img src="/src/components/images/log.png" alt="Logo" />
                    <span>kaxafa & j auditores</span>
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="text-content">
                        <h1>Main page</h1>
                        <p>Innovation that flows</p>
                        <button>TRY FOR FREE</button>
                    </div>
                    <div className="image-content">
                        <img src="/src/components/images/ima.png" alt="Illustration" />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
