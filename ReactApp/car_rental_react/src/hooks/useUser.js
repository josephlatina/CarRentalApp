import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const baseURL = "http://127.0.0.1:8000/auth/";

export default function useUser() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("access");
        if (!!!accessToken) {
            setIsSignedIn(false);
            return;
        }

        setIsSignedIn(true);
        setUser(jwtDecode(accessToken));
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(baseURL + "token/", {
                email,
                password,
            });
            const tokens = res.data;

            localStorage.setItem("access", tokens.access);
            localStorage.setItem("refresh", tokens.refresh);

            setIsSignedIn(true);
            setUser(jwtDecode(tokens.access));
        } catch (e) {
            setError(e);
        }
    };

    const signup = async (email, password, password2) => {
        try {
            await axios.post(baseURL + "register/", {
                email,
                password,
                password2,
            });
            await login(email, password);
        } catch (e) {
            const errorString = Object.values(error)
                .map((value) => value.join("\n"))
                .join(" \n");
            setError(errorString);
        }
    };

    const logOut = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
        setIsSignedIn(false);
    };

    return { isSignedIn, user, logOut, login, error, signup };
}
