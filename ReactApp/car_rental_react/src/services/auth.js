import axios from "axios";
import jwt_decode from "jwt-decode";

const baseURL = "http://127.0.0.1:8000/auth/";

const login = async (email, password) => {
    try {
        const res = await axios.post(baseURL + "token/", {
            email,
            password,
        });
        const tokens = res.data;
        localStorage.setItem("access", tokens.access);
        localStorage.setItem("refresh", tokens.refresh);

        return null;
    } catch (e) {
        return e;
    }
};

export { login };
