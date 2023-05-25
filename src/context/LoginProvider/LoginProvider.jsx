import axios from "axios";
import React, { createContext, useState } from "react";

const LoginContext = createContext();
function LoginProvider({ children }) {
    const [user, setUser] = useState();

    const [active, setActive] = useState(false);
    const [admin, setAdmin] = useState(false);

    const handleCookie = async () => {
        const Cookies = document.cookie.split(";");
        let username = "";
        Cookies.find((Cookie) => {
            if (Cookie.split("=")[0] === "username") {
                return (username = Cookie.split("=")[1]);
            }
        });
        if (username !== "") {
            await axios.get(`http://localhost:8080/api/auth/user/${username}`).then((e) => {
                setUser(e.data);
                if (e.data.role === "admin") {
                    setAdmin(true);
                }
                setActive(true);
            });
        }
    };

    const deleteCookie = () => {
        const Cookies = document.cookie.split(";");
        function eraseCookie(name) {
            document.cookie = name + "=; Max-Age=-99999999;";
        }
        Cookies.forEach((Cookie) => {
            eraseCookie(Cookie.split("=")[0]);
        });
    };

    const handleLogout = () => {
        deleteCookie();
        setUser();
        setActive(false);
        setAdmin(false);
    };

    const getLastName = () => {
        let array = user.name.trim().split(" ");
        console.log(array[array.length - 1]);
        return array[array.length - 1];
    };

    const value = {
        active,
        setActive,
        user,
        setUser,
        admin,
        setAdmin,
        getLastName,
        handleCookie,
        deleteCookie,
        handleLogout,
    };
    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export { LoginContext, LoginProvider };
