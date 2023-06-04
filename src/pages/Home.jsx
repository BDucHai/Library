import React, { useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginProvider";

import HomeAdmin from "../components/HomeAdmin";
import Nav from "../components/Nav";
import HomeUser from "../components/HomeUser";
import Footer from "../components/Footer";

const Home = () => {
    useEffect(() => {}, []);
    const context = useContext(LoginContext);
    return (
        <>
            <Nav />
            {context.admin ? <HomeAdmin /> : <HomeUser />}
            <Footer />
        </>
    );
};

export default Home;
