import { createContext, useContext } from "react";
import useUser from "../hooks/useUser";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useUser();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};
