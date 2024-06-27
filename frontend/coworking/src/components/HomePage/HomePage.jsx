import React from 'react';

function HomePage() {
    return (
        <div className="container">
            <header className="header">
                <h1>Online Coworking Space</h1>
            </header>
            <section className="hero">
                <h1>Work from anywhere, together</h1>
                <p>Join our online community of remote workers and entrepreneurs</p>
                <button>Get Started</button>
            </section>
            <section className="features">
                <div className="feature">
                    <i className="fas fa-laptop"/>
                    <h2>Flexible Workspaces</h2>
                    <p>Choose from a variety of virtual workspaces to suit your needs</p>
                </div>
                <div className="feature">
                    <i className="fas fa-users"/>
                    <h2>Community Support</h2>
                    <p>Connect with other remote workers and entrepreneurs in our online community</p>
                </div>
                <div className="feature">
                    <i className="fas fa-lock"/>
                    <h2>Secure and Reliable</h2>
                    <p>Our platform is secure and reliable, so you can focus on your work</p>
                </div>
            </section>
            <footer className="footer">
                <p>Copyright 2023 Online Coworking Space</p>
            </footer>
        </div>
    );
}

export default HomePage;