import React, { useState } from "react";
import { resetPassword } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        console.log("Validating password:", password);  // Debugging password validation

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasNumber.test(password)) {
            return "Password must contain at least one number.";
        }
        if (!hasSpecialChar.test(password)) {
            return "Password must contain at least one special character.";
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted, validating password..."); // Debugging form submission

        setMessage("");
        setError("");
        setLoading(true);

        const validationMessage = validatePassword(newPassword);
        if (validationMessage) {
            setError(validationMessage);
            setLoading(false);
            console.log("Password validation failed:", validationMessage); // Debugging validation failure
            return;
        }

        try {
            console.log("Sending reset password request..."); // Debugging API request
            const response = await resetPassword(token, newPassword);
            console.log("Response from password reset:", response); // Debugging successful response
            setMessage(response.message || "Password reset successfully!");
            setNewPassword("");  // Clear password field
            setTimeout(() => navigate("/login"), 3000); // Redirect after success
        } catch (error) {
            console.error("Error during password reset:", error); // Debugging error
            if (error.response?.status === 400) {
                setError("Invalid or expired token. Please request a new password reset.");
            } else {
                setError(error.message || "Failed to reset password.");
            }
        } finally {
            setLoading(false);
            console.log("Password reset process finished."); // Debugging process end
        }
    };

    return (
        <div className="center">
            <h2>Reset Password</h2>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="txt_field">
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <span></span>
                    <label>New Password</label>
                </div>
                <input type="submit" value="Reset Password" />
                {loading && <div className="loading-spinner">Loading...</div>}
            </form>
        </div>
    );
};

export default ResetPassword;
