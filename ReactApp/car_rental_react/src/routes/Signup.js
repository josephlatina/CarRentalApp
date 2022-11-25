import { useState } from "react";
import "../css/auth.css";
import { useAuth } from "../provider/authContext";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { signup, error, isSignedIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password, password2);

        if (!!!error) {
            setEmail("");
            setPassword("");
            setPassword2("");
        }
    };

    if (isSignedIn)
        return <div className="Auth-form-container">Already signed in</div>;

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>

                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary">Sign In</span>
                    </div>

                    <div className="text-center text-danger">{error}</div>
                    <div className="form-group mt-3">
                        <label className="authLabel">Email address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label className="authLabel">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label className="authLabel">Confirm password</label>
                        <input
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Confirm password"
                        />
                    </div>

                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Create Account
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    );
}
