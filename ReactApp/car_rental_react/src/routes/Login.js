import "../css/auth.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/authContext";
import { Spinner } from "reactstrap";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isSignedIn, isLoading } = useAuth();

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);

        setEmail("");
        setPassword("");
    };

    return (
        <div className="Auth-form-container">
            {isSignedIn && <div>Already signed in</div>}
            {isLoading && <Spinner>Loading...</Spinner>}
            {!isLoading && !isSignedIn && (
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Member Sign In</h3>
                        <div className="text-center text-danger">{error}</div>

                        <div className="form-group mt-3">
                            <label className="authLabel">Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                onChange={handleEmailInput}
                                value={email}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label className="authLabel">Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={handlePasswordInput}
                                value={password}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3 mb-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary">
                                <Link to="/signup">Sign Up</Link>
                            </span>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Login;
