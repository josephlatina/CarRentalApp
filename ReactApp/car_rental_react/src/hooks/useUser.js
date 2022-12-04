import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const baseURL = "http://127.0.0.1:8000/api/";
const authBaseURL = "http://127.0.0.1:8000/auth/";

export default function useUser() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("access");
        if (!!!accessToken) {
            setIsSignedIn(false);
            return;
        }

        setIsSignedIn(true);
        setUser(jwtDecode(accessToken));
    }, []);

    useEffect(() => {
        //Fetch customer info
        const getCustomer = async () => {
            const res = await axios.get(
                baseURL + "customers/?user_id=" + user.id
            );
            setCustomer(res.data[0]);
        };

        if (!!user) getCustomer();
    }, [user]);

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const res = await axios.post(authBaseURL + "token/", {
                email,
                password,
            });

            const tokens = res.data;

            localStorage.setItem("access", tokens.access);
            localStorage.setItem("refresh", tokens.refresh);

            setIsLoading(false);
            setIsSignedIn(true);
            setUser(jwtDecode(tokens.access));
            setError("");
        } catch (e) {
            setIsLoading(false);
            setError(e.response.data.detail);
        }
    };

    const signup = async (email, password, password2) => {
        try {
            setIsLoading(true);
            await axios.post(authBaseURL + "register/", {
                email,
                password,
                password2,
            });
            await login(email, password);
            setIsLoading(false);
        } catch (e) {
            const errorString = Object.values(e.response.data)
                .map((value) => value.join("\n"))
                .join(" \n");
            setIsLoading(false);
            setError(errorString);
        }
    };

    const updateCustomer = async ({
        firstName,
        lastName,
        license,
        email,
        DOB,
        province,
        city,
        postalCode,
        street_name,
        street_number,
        unitNum,
        id,
    }) => {
        if (!!street_name) {
            setError(
                "Street Address must be in format: <Street Num> <Street Number>"
            );
            return;
        }

        try {
            setIsLoading(true);
            const res = await axios.put(
                `http://127.0.0.1:8000/api/customers/${id}/`,
                {
                    first_name: firstName,
                    last_name: lastName,
                    drivers_license: license,
                    email: user.email,
                    DOB,
                    gold_member: false,
                    province,
                    city,
                    postal_code: postalCode,
                    street_name,
                    street_number,
                    unitNum,
                }
            );
            setCustomer(res.data);
            setIsLoading(false);
        } catch (e) {
            const errorString = Object.keys(e.response.data)
                .map((k) => k + ": " + e.response.data[k])
                .join(" \n");
            setIsLoading(false);
            setError(errorString);
        }
    };

    const logOut = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
        setIsSignedIn(false);
    };

    return {
        isSignedIn,
        user,
        logOut,
        login,
        error,
        signup,
        isLoading,
        customer,
        updateCustomer,
    };
}
