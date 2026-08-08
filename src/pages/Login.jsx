import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login as loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");


        try {

            /*
            =========================================
            LOGIN
            =========================================
            */

            const data =
                await loginUser(form);


            if (data.error) {

                setError(data.error);

                return;

            }


            /*
            =========================================
            IMPORTANT

            Remove data belonging to the previous
            logged-in account.

            This prevents:
            Hima's resume
            Hima's parsedResume
            Hima's analysis
            etc.

            from appearing for the new user.
            =========================================
            */

            sessionStorage.clear();


            /*
            =========================================
            SAVE NEW LOGIN SESSION
            =========================================
            */

            login(data);


            /*
            =========================================
            LOGIN XP

            Backend decides whether today's
            +5 XP has already been awarded.
            =========================================
            */

            try {

                const token =
                    data.token ||
                    localStorage.getItem("token");


                if (token) {

                    const rewardResponse =
                        await fetch(
                            `${import.meta.env.VITE_API_URL}/momentum/reward`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    Authorization:
                                        `Bearer ${token}`
                                },

                                body: JSON.stringify({
                                    activityKey: "login",
                                    activityType: "daily-login"
                                })
                            }
                        );


                    const rewardData =
                        await rewardResponse.json();


                    if (
                        rewardResponse.ok &&
                        rewardData.rewarded
                    ) {

                        console.log(
                            `Login XP: +${rewardData.xpEarned} XP`
                        );

                    }

                    else if (
                        rewardResponse.ok
                    ) {

                        console.log(
                            "Login XP already earned today."
                        );

                    }

                    else {

                        console.warn(
                            "Login XP request failed:",
                            rewardData
                        );

                    }

                }

            }

            catch (rewardError) {

                console.error(
                    "Unable to award login XP:",
                    rewardError
                );

            }

            /*
            =================================================
            START A COMPLETELY FRESH SESSION
            =================================================
            */

            window.location.href = "/dashboard";
                    }

        catch (err) {

            console.error(
                "Login error:",
                err
            );

            setError(
                "Login failed."
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>
                    FutureTwin AI
                </h1>


                <h2>
                    Welcome Back
                </h2>


                <form
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />


                    {error && (

                        <p className="error">
                            {error}
                        </p>

                    )}


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>


                <p>

                    Don't have an account?

                    <Link to="/signup">
                        {" "}Sign Up
                    </Link>

                </p>


                <Link
                    to="/forgot-password"
                    className="forgot-link"
                >
                    Forgot Password?
                </Link>

            </div>

        </div>

    );

}

export default Login;