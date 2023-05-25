import React, { useContext } from "react";
import { LoginContext } from "../context/LoginProvider";

import HomeAdmin from "../components/HomeAdmin";
import Nav from "../components/Nav";
import HomeUser from "../components/HomeUser";

const Home = () => {
    const context = useContext(LoginContext);
    return (
        <>
            <Nav />
            {context.admin ? <HomeAdmin /> : <HomeUser />}
        </>
    );
};

export default Home;
