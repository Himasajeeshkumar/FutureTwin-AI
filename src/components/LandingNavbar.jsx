import { Link } from "react-router-dom";
import "../styles/navbar.css";

function LandingNavbar() {

    const token = localStorage.getItem("token");

    return (

        <nav className="navbar">

            <div className="logo">

                <a href="#home">
                    FutureTwin AI
                </a>

            </div>

            <div className="nav-links">

                <a href="#home">Home</a>

                <a href="#features">Features</a>

                <a href="#momentum">Momentum</a>

                <a href="#about">About</a>

            </div>

            <div className="profile">

                {token ? (

                    <Link className="signup-btn" to="/dashboard">
                        Dashboard
                    </Link>

                ) : (

                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link className="signup-btn" to="/signup">
                            Sign Up
                        </Link>
                    </>

                )}

            </div>

        </nav>

    );

}

export default LandingNavbar;