import logo from '../../assets/logo.png';

const MobileNav = () => {

    return (
        <Container>
            <LogoLink to='/'>
                <Logo src={logo} alt="imirae-logo" />
            </LogoLink>
            
            <MenuButton aria-label="Open menu">
            </MenuButton>
        </Container>
    )
}

export default MobileNav;