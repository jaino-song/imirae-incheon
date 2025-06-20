import { useState } from 'react';
import MobileMenu from './MobileMenu';
import logo from '../../assets/logo.png';
import styled from "@emotion/styled";

const MobileNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Container>
            <LogoLink to='/'>
                <Logo src={logo} alt="imirae-logo" />
            </LogoLink>
            
            <MenuButton onClick={handleMenuClick} aria-label="Open menu">
            </MenuButton>
        </Container>
    )
}

export default MobileNav;