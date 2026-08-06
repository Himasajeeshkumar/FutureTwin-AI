import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();
    

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    const [showMenu, setShowMenu] = useState(false);

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    }

    return (

        <nav className="navbar">

            <div className="logo">

                <Link to="/">
                    FutureTwin AI
                </Link>

            </div>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/#features">Features</Link>

                <Link to="/#momentum">Momentum</Link>

                <Link to="/#about">About</Link>

                {isLoggedIn && (
                    <Link to="/dashboard">Dashboard</Link>
                )}

            </div>

            <div className="profile">

                {isLoggedIn ? (

                    <div className="profile-menu">

                        <button
                            className="profile-btn"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            👤 {user?.name?.split(" ")[0]}
                            <span>▼</span>
                        </button>

                        {showMenu && (

                            <div className="profile-dropdown">

                                <Link to="/dashboard"
                                onClick={() => setShowMenu(false)}
                                >
                                    📊 Dashboard
                                </Link>

                                <Link to="/resume-analysis">
                                    📄 Resume Analysis
                                </Link>

                                <hr />

                                <button onClick={logout}>
                                    🚪Logout
                                </button>

                            </div>

                            )}

                    </div>

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

export default Navbar;