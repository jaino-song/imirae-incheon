import styled from "@emotion/styled";
import NavBar from "./NavBar";
import MobileNavBar from "./MobileNavBar";

const Nav = () => {
    return (
        <>
        <FullNav>
            <NavBar />
        </FullNav>
        <MobileNav>
            <MobileNavBar />
        </MobileNav>
        </>
    )
}

const FullNav = styled.div`
    @media (max-width: 1200px) {
        display: none;
    }
`

const MobileNav = styled.div`
    @media (min-width: 1200px) {
        display: none;
    }
`

export default Nav;