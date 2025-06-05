import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

const MobileNavBar = () => {
    return (
        <Container>
            <MenuIcon onClick={() => setIsMenuOpen(false)}>
                <ImCross />
            </MenuIcon>
            
        </Container>
    )
}

export default MobileNavBar;