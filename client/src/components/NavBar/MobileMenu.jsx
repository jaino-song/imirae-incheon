import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import MobileNavButton from "./MobileNavButton";

const MobileMenu = ({ setIsMenuOpen }) => {
    return (
        <>
            <NavContainer>
                <Nav>
                    <MobileNavButton link="/greetings" onClick={() => setIsMenuOpen(false)}>첫인사</MobileNavButton>
                    <MobileNavButton link="/service-info" onClick={() => setIsMenuOpen(false)}>서비스 소개</MobileNavButton>
                    <MobileNavButton link="/price-info" onClick={() => setIsMenuOpen(false)}>금액 및 계좌번호</MobileNavButton>
                    <MobileNavButton link="/reminder" onClick={() => setIsMenuOpen(false)}>상담 후 리마인더</MobileNavButton>
                    <MobileNavButton link="/thanks" onClick={() => setIsMenuOpen(false)}>예약 완료</MobileNavButton>
                    <MobileNavButton link="/survey" onClick={() => setIsMenuOpen(false)}>모니터링 설문</MobileNavButton>
                    <MobileNavButton link="/contract" onClick={() => setIsMenuOpen(false)}>산모계약서</MobileNavButton>
                </Nav>
            </NavContainer>
            <Container onClick={() => setIsMenuOpen(false)} />
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
    z-index: 999;
    animation: fadeIn 0.5s ease-in-out; 

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 0.5;
        }
    }
`

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 1000;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
    border-radius: 0 0 20px 20px;
    animation: fadeIn 1s ease-in-out; 

    @keyframes fadeIn {
        from {
            opacity: 0.5;
        }
        to {
            opacity: 1;
        }
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

export default MobileMenu;