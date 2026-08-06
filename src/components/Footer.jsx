import "./Footer.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer(){

    return(

        <footer className="footer">

            <div className="footer-top">

                <div className="footer-brand">

                    <h2>FutureTwin AI</h2>

                    <p>
                        AI-powered career intelligence platform helping
                        students become placement ready.
                    </p>

                    <div className="footer-social">

                        <a href="#">
                            <FaGithub size={20} />
                        </a>

                        <a href="#">
                            <FaLinkedin size={20}/>
                        </a>

                        <a href="#">
                            <MdEmail size={20}/>
                        </a>

                    </div>

                </div>

                <div className="footer-links">

                    <div>

                        <h4>Platform</h4>

                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Workflow</a>
                        <a href="#">Dashboard</a>

                    </div>

                    <div>

                        <h4>Features</h4>

                        <a href="#">Resume Analysis</a>
                        <a href="#">Job Match</a>
                        <a href="#">Skill Gap</a>
                        <a href="#">AI Mentor</a>

                    </div>

                </div>

            </div>

            <div className="footer-bottom">

                © 2026 FutureTwin AI

                Built with React, Express, MongoDB & Groq AI

            </div>

        </footer>

    );

}

export default Footer;