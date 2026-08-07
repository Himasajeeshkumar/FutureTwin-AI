import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useState, useEffect } from "react";

import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();
    

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    const [showMenu, setShowMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth > 768) {

                setMobileMenu(false);

            }

        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

    }, []);

    function logout() {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setShowMenu(false);

        setMobileMenu(false);

        navigate("/login");

    }

    return (

        <nav className="navbar">

            <div className="logo">

                <HashLink smooth to="/#home">
                    FutureTwin AI
                </HashLink>

            </div>

            <div

                className={`nav-links ${mobileMenu ? "active" : ""}`}

            >

                <Link

                to="/"

                onClick={() => setMobileMenu(false)}

            >
                    Home
                </Link>

                <Link
                to="/resume-analysis"
                onClick={() => {
                    setShowMenu(false);
                    setMobileMenu(false);
                }}
            >
                📄 Resume Analysis
            </Link>

                <HashLink
                smooth
                to="/#features"
                onClick={() => setMobileMenu(false)}
            >
                Features
            </HashLink>

            <HashLink
                smooth
                to="/#momentum"
                onClick={() => setMobileMenu(false)}
            >
                Momentum
            </HashLink>

            <HashLink
                smooth
                to="/#about"
                onClick={() => setMobileMenu(false)}
            >
                About
            </HashLink>

                {isLoggedIn && (
                    <Link
                        to="/dashboard"
                        onClick={() => {

                            setShowMenu(false);

                            setMobileMenu(false);

                        }}
                    >
                        Dashboard
                    </Link>
                )}

            </div>

            <button
                className="menu-btn"
                onClick={() => setMobileMenu(!mobileMenu)}
            >
                {mobileMenu ? "✕" : "☰"}
            </button>

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

                                <Link
                                to="/resume-analysis"
                                onClick={()=>setShowMenu(false)}
                                >
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
                        <Link
                            to="/login"
                            onClick={()=>setMobileMenu(false)}
                            >
                            Login
                        </Link>

                        <Link
                            className="signup-btn"
                            to="/signup"
                            onClick={() => setMobileMenu(false)}
                        >
                            Sign Up
                        </Link>
                    </>

                )}

            </div>
        </nav>

    );

}

export default Navbar;