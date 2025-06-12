import styled from "@emotion/styled";
import MobileNavButton from "./MobileNavButton";    
import { ImCross } from "react-icons/im";
import { useState } from "react";

const MobileMenu = ({ setIsMenuOpen, isMenuOpen }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsMenuOpen(false);
        }, 500);
    }

    return (
        <>
            <NavContainer isMenuOpen={!isClosing}>
                <CloseButton onClick={handleClose}>
                    <ImCross />
                </CloseButton>
                <Nav>
                    <MobileNavButton link="/greetings" onClick={handleClose}>첫인사</MobileNavButton>
                    <MobileNavButton link="/service-info" onClick={handleClose}>서비스 소개</MobileNavButton>
                    <MobileNavButton link="/price-info" onClick={handleClose}>금액 및 계좌번호</MobileNavButton>
                    <MobileNavButton link="/reminder" onClick={handleClose}>상담 후 리마인더</MobileNavButton>
                    <MobileNavButton link="/thanks" onClick={handleClose}>예약 완료</MobileNavButton>
                    <MobileNavButton link="/survey" onClick={handleClose}>모니터링 설문</MobileNavButton>
                    <MobileNavButton link="/contract" onClick={handleClose}>전자계약서</MobileNavButton>
                </Nav>
            </NavContainer>
            <Container isClosing={isClosing} onClick={handleClose} />
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 900;
    animation: ${props => props.isClosing ? 'fadeOut' : 'fadeIn'} 0.5s ease-in-out; 

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 0.5; }
    }

    @keyframes fadeOut {
        from { opacity: 0.5; }
        to { opacity: 0; }
    }
`

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 1000;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
    border-radius: 0 0 20px 20px;
    animation: ${props => props.isMenuOpen ? 'slideIn' : 'slideOut'} 0.5s ease-in-out; 

    @keyframes slideIn {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
    }  

    @keyframes slideOut {
        from { transform: translateY(0); }
        to { transform: translateY(-100%); }
    }
`

const Nav = styled.div`
    margin-top: 10%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 100%;
    height: 100%;
    gap: 1em;
    padding: 1em;
    justify-items: center;
`

const CloseButton = styled.div`
    position: absolute;
    top: 4%;
    left: 4%;
    font-size: 1.7rem;
    cursor: pointer;
`

export default MobileMenu;