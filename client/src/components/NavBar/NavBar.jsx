import styled from "@emotion/styled";
import NavButton from "./NavButton";
import logo from "../../assets/logo.png";

const NavBar = () => {
    return (
        <NavContainer>
            <Logo src={logo} alt="logo" height={'5%'} width={'5%'}/>
            <Nav>
                <NavButton link="/greetings">첫인사</NavButton>
                <NavButton link="/service-info">서비스 소개</NavButton>
                <NavButton link="/price-info">금액 및 계좌번호</NavButton>
                <NavButton link="/reminder">상담 후 리마인더</NavButton>
                <NavButton link="/thanks">예약 완료</NavButton>
                <NavButton link="/survey">모니터링 설문</NavButton>
                <NavButton link="/contract">산모계약서</NavButton>
            </Nav>
        </NavContainer>
    )
}
const Logo = styled.img`
    height: 5%;
    width: 5%;
`

const NavContainer = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    flex:
`

const Nav = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 100px;
    background-color: #fff;
`

export default NavBar;

