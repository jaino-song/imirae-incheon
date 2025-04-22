import styled from "@emotion/styled";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default RootLayout;