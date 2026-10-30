
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const location = useLocation();

    // Login ke time navigate() se email aayegi
    const email = location.state?.email || "";

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [cooldown, setCooldown] = useState(0);

    const handleResend = async () => {
        try {
            setLoading(true);
            setMessage("");
            setError("");

            await axios.post(
                "http://localhost:5000/api/verification/resend-verification",
                {
                    email: email,
                }
            );

            setMessage(
                "Verification email sent successfully!"
            );

            // 60 second cooldown
            setCooldown(60);

            const timer = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to send verification email"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-page">

            <div className="verify-card">

                <h1>Verify Your Email</h1>

                <p className="main-text">
                    We sent a verification link to
                </p>

                <p className="email">
                    {email}
                </p>

                <p className="description">
                    Please check your inbox and click the
                    verification link to verify your email.
                </p>

                <p className="resend-text">
                    Didn't receive the email?
                </p>

                <button
                    onClick={handleResend}
                    disabled={loading || cooldown > 0}
                >
                    {loading
                        ? "Sending..."
                        : cooldown > 0
                        ? `Resend in ${cooldown}s`
                        : "Resend Verification Email"
                    }
                </button>

                {message && (
                    <p className="success">
                        ✓ {message}
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <p className="spam-text">
                    Don't see the email? Check your spam or
                    junk folder.
                </p>

            </div>

        </div>
    );
};

export default VerifyEmail;

