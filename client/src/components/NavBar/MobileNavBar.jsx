import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import logo from "../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const MobileNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <Container>
            <SideContainer>
                <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <ImCross /> : <GiHamburgerMenu />}
                </MenuIcon>
            </SideContainer>
            <SideContainer>
                <Logo src={logo} alt="logo" />
            </SideContainer>
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
    justify-content: flex-start;
    flex-grow: 1;
    height: 100%;

    &:nth-child(2) {
        justify-content: center;
    }

`

const Logo = styled.img`
    height: 3rem;
`

const MenuIcon = styled.div`
    display: block;
    font-size: 3rem;
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