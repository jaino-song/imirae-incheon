import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import logo from "../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const MobileNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Container>
            {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />}
                <SideContainer>
                    <MenuIcon isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <GiHamburgerMenu />
                    </MenuIcon>
                </SideContainer>
                <LogoContainer>
                    <Logo src={logo} alt="logo" display={isMenuOpen ? "none" : "block"}/>
                </LogoContainer>
                <SideContainer></SideContainer>
            
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`
const SideContainer = styled.div`
    display: flex;
    height: 100%;
    flex: 1;
    justify-content: flex-start;
`

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`

const Logo = styled.img`
    height: 3rem;
`

const MenuIcon = styled.div`
    display: block;
    font-size: 2rem;
    margin-left: 4%;
    color:rgb(54, 54, 54);
    cursor: pointer;
    @media (min-width: 1200px) {
        display: none;
        font-size: 1.5em;
        cursor: pointer;
    }
`
export default MobileNavBar;