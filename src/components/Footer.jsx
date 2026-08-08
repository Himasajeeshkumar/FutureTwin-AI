import "./Footer.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-top">

                <div className="footer-brand">

                    <h2>FutureTwin AI</h2>

                    <p>
                        AI-powered career intelligence platform
                        helping students become placement ready.
                    </p>

                    <div className="footer-social">

                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub size={20} />
                        </a>

                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={20} />
                        </a>

                        <a
                            href="mailto:himasajeesh2005@gmail.com"
                            aria-label="Email"
                        >
                            <MdEmail size={20} />
                        </a>

                    </div>

                </div>

                <div className="footer-links">

                    <div>
                        <h4>Platform</h4>

                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/momentum">Momentum AI</Link>
                    </div>

                    <div>
                        <h4>Features</h4>

                        <Link to="/resume-analysis">
                            Resume Analysis
                        </Link>

                        <Link to="/job-match">
                            Job Match
                        </Link>

                        <Link to="/skill-gap">
                            Skill Gap
                        </Link>

                        <Link to="/mentor">
                            AI Mentor
                        </Link>

                    </div>

                </div>

            </div>

            <div className="footer-bottom">
                <span>© 2026 FutureTwin AI</span>

                <span>
                    Built with React, Express, MongoDB & Groq AI
                </span>
            </div>

        </footer>
    );
}

export default Footer;