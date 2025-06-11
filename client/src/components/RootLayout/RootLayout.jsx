import { Outlet } from "react-router-dom";
import Nav from "../NavBar/Nav";

const RootLayout = () => {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
}



export default RootLayout;