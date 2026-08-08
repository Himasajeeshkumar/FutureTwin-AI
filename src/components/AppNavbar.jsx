import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useState, useEffect } from "react";

import {
    X,
    Menu,
    User,
    ChevronDown,
    LayoutDashboard,
    FileText,
    LogOut
} from "lucide-react";

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

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {

            window.removeEventListener(
                "resize",
                handleResize
            );

        };

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

            {/* Logo */}

            <div className="logo">

                <HashLink
                    smooth
                    to="/#home"
                >
                    FutureTwin AI
                </HashLink>

            </div>


            {/* Navigation Links */}

            <div
                className={`nav-links ${
                    mobileMenu ? "active" : ""
                }`}
            >

                <Link
                    to="/"
                    onClick={() =>
                        setMobileMenu(false)
                    }
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
                    Resume Analysis
                </Link>


                <HashLink
                    smooth
                    to="/#features"
                    onClick={() =>
                        setMobileMenu(false)
                    }
                >
                    Features
                </HashLink>


                <HashLink
                    smooth
                    to="/#momentum"
                    onClick={() =>
                        setMobileMenu(false)
                    }
                >
                    Momentum
                </HashLink>


                <HashLink
                    smooth
                    to="/#about"
                    onClick={() =>
                        setMobileMenu(false)
                    }
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


            {/* Mobile Menu Button */}

            <button
                type="button"
                className="menu-btn"
                onClick={() =>
                    setMobileMenu(!mobileMenu)
                }
                aria-label={
                    mobileMenu
                        ? "Close menu"
                        : "Open menu"
                }
            >

                {mobileMenu ? (

                    <X
                        size={22}
                        strokeWidth={2}
                    />

                ) : (

                    <Menu
                        size={22}
                        strokeWidth={2}
                    />

                )}

            </button>


            {/* Profile */}

            <div className="profile">

                {isLoggedIn ? (

                    <div className="profile-menu">

                        {/* Profile Button */}

                        <button
                            type="button"
                            className="profile-btn"
                            onClick={() =>
                                setShowMenu(!showMenu)
                            }
                        >

                            <User
                                size={18}
                                strokeWidth={2}
                            />

                            <span>
                                {user?.name
                                    ?.split(" ")[0]}
                            </span>

                            <ChevronDown
                                size={16}
                                strokeWidth={2}
                            />

                        </button>


                        {/* Profile Dropdown */}

                        {showMenu && (

                            <div className="profile-dropdown">

                                <Link
                                    to="/dashboard"
                                    onClick={() =>
                                        setShowMenu(false)
                                    }
                                >

                                    <LayoutDashboard
                                        size={17}
                                        strokeWidth={2}
                                    />

                                    <span>
                                        Dashboard
                                    </span>

                                </Link>


                                <Link
                                    to="/resume-analysis"
                                    onClick={() =>
                                        setShowMenu(false)
                                    }
                                >

                                    <FileText
                                        size={17}
                                        strokeWidth={2}
                                    />

                                    <span>
                                        Resume Analysis
                                    </span>

                                </Link>


                                <hr />


                                <button
                                    type="button"
                                    onClick={logout}
                                >

                                    <LogOut
                                        size={17}
                                        strokeWidth={2}
                                    />

                                    <span>
                                        Logout
                                    </span>

                                </button>

                            </div>

                        )}

                    </div>

                ) : (

                    <>

                        <Link
                            to="/login"
                            onClick={() =>
                                setMobileMenu(false)
                            }
                        >
                            Login
                        </Link>


                        <Link
                            className="signup-btn"
                            to="/signup"
                            onClick={() =>
                                setMobileMenu(false)
                            }
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