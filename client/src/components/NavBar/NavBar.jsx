import styled from "@emotion/styled";
import NavButton from "./NavButton";
import logo from "../../assets/logo.png";

const NavBar = () => {
    
    return (
        <NavContainer>
            <BalancingDiv>
                <Logo src={logo} alt="logo" />
            </BalancingDiv>
            <Nav>
                <NavButton link="/greetings">첫인사</NavButton>
                <NavButton link="/service-info">서비스 소개</NavButton>
                <NavButton link="/price-info">금액 및 계좌번호</NavButton>
                <NavButton link="/reminder">상담 후 리마인더</NavButton>
                <NavButton link="/thanks">예약 완료</NavButton>
                <NavButton link="/survey">모니터링 설문</NavButton>
                <NavButton link="/contract">전자계약서</NavButton>
            </Nav>
            <BalancingDiv></BalancingDiv>
        </NavContainer>
    )
}
const Logo = styled.img`
    height: 100%;
    width: 100%;
    position: relative;
    right: 30%;
    @media (max-width: 1199px) {
        display: none;
    }
    
`

const NavContainer = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 3%;
    @media (max-width: 1199px) {
        justify-content: left;
    }

`

const BalancingDiv = styled.div`
    height: 4rem;
    width: 4rem;
    @media (max-width: 1199px) {
        display: none;
    }
`

const Nav = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 100px;
    background-color: #fff;
    height: 5%;
    @media (max-width: 1199px) {
        display: none;
    }
`

export default NavBar;

