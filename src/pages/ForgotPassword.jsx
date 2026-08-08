import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpTimeLeft, setOtpTimeLeft] = useState(600);
    const [resending, setResending] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const sendOTP = async () => {

        setError("");
        setMessage("");

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                `${API_URL}/forgot-password`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to send OTP."
                );
            }

            setMessage(
                "OTP sent successfully. Check your email."
            );
            setOtpTimeLeft(600);
            setStep(2);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };

    const resendOTP = async () => {

        setError("");
        setMessage("");

        try {

            setResending(true);

            const response = await fetch(
                `${API_URL}/forgot-password`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to resend OTP."
                );
            }

            setOtp("");
            setOtpTimeLeft(600);

            setMessage(
                "A new OTP has been sent to your email."
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setResending(false);

        }

    };

    const verifyOTP = async () => {

        setError("");
        setMessage("");

        if (!otp.trim()) {
            setError("Please enter the OTP.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                `${API_URL}/verify-otp`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.trim(),
                        otp: otp.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Invalid OTP."
                );
            }

            setMessage(
                "OTP verified successfully."
            );

            setStep(3);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };

    const resetPassword = async () => {

        setError("");
        setMessage("");

        if (!newPassword || !confirmPassword) {

            setError(
                "Please enter and confirm your new password."
            );

            return;

        }

        if (newPassword.length < 6) {

            setError(
                "Password must be at least 6 characters."
            );

            return;

        }

        if (newPassword !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;

        }

        try {

            setLoading(true);

            const response = await fetch(
                `${API_URL}/reset-password`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.trim(),
                        otp: otp.trim(),
                        newPassword
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to reset password."
                );
            }

            setMessage(
                "Password reset successfully! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

    if (step !== 2 || otpTimeLeft <= 0) {
        return;
    }

    const timer = setInterval(() => {

        setOtpTimeLeft((previous) =>
            previous - 1
        );

    }, 1000);

    return () => clearInterval(timer);

}, [step, otpTimeLeft]);

    return (

        <div className="forgot-password">

            <div className="forgot-card">

                <h1>🔐 Reset Password</h1>

                <p className="forgot-subtitle">
                    Recover your FutureTwin AI account securely.
                </p>

                {step === 1 && (

                    <>

                        <h2>Enter your email</h2>

                        <p>
                            We'll send a verification OTP to your email.
                        </p>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <button
                            onClick={sendOTP}
                            disabled={loading}
                        >
                            {loading
                                ? "Sending..."
                                : "📩 Send OTP"}
                        </button>

                    </>

                )}

                {step === 2 && (

                    <>

                        <h2>Enter OTP</h2>

                        <p>
                            We sent a 6-digit OTP to
                            <br />
                            <strong>{email}</strong>
                        </p>

                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength="6"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                        />
                        <div className="otp-timer">

                            {otpTimeLeft > 0 ? (

                                <span>
                                    OTP expires in{" "}
                                    <strong>
                                        {Math.floor(otpTimeLeft / 60)}:
                                        {String(otpTimeLeft % 60).padStart(2, "0")}
                                    </strong>
                                </span>

                            ) : (

                                <span className="otp-expired">
                                    OTP expired
                                </span>

                            )}

                        </div>

                        <button
                            type="button"
                            className="resend-otp"
                            onClick={resendOTP}
                            disabled={resending || otpTimeLeft > 0}
                        >
                            {resending
                                ? "Sending..."
                                : otpTimeLeft > 0
                                ? "Resend OTP"
                                : "🔄 Resend OTP"}
                        </button>

                        <button
                            onClick={verifyOTP}
                            disabled={loading}
                        >
                            {loading
                                ? "Verifying..."
                                : "✅ Verify OTP"}
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() => {
                                setStep(1);
                                setOtp("");
                                setError("");
                                setMessage("");
                            }}
                        >
                            Change Email
                        </button>

                    </>

                )}

                {step === 3 && (

                    <>

                        <h2>Create new password</h2>

                        <p>
                            Choose a new password for your account.
                        </p>

                        <div className="password-input-wrapper">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>

                        </div>

                        {newPassword && (
                            <div className="password-strength">

                                <div
                                    className={`strength-bar ${
                                        newPassword.length >= 10
                                            ? "strong"
                                            : newPassword.length >= 6
                                            ? "medium"
                                            : "weak"
                                    }`}
                                />

                                <span>
                                    {newPassword.length >= 10
                                        ? "Strong password"
                                        : newPassword.length >= 6
                                        ? "Medium password"
                                        : "Weak password"}
                                </span>

                            </div>
                        )}

                        <div className="password-input-wrapper">

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>

                        </div>
                        <button
                            onClick={resetPassword}
                            disabled={loading}
                        >
                            {loading
                                ? "Resetting..."
                                : "🔑 Reset Password"}
                        </button>

                    </>

                )}

                {error && (
                    <div className="forgot-error">
                        ❌ {error}
                    </div>
                )}

                {message && (
                    <div className="forgot-success">
                        ✅ {message}
                    </div>
                )}

                <button
                    className="back-login"
                    onClick={() => navigate("/login")}
                >
                    ← Back to Login
                </button>

            </div>

        </div>

    );
}

export default ForgotPassword;