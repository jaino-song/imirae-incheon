import styled from "@emotion/styled";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const RootLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            {isMenuOpen && <MobileNavBar />}
            <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Outlet />
        </>
    );
}



export default RootLayout;