import styled from "@emotion/styled";
import NavButton from "./NavButton";

const NavBar = () => {
    return (
        <Nav>
            <NavButton link="/greetings">첫인사</NavButton>
            <NavButton link="/service-info">서비스 소개</NavButton>
            <NavButton link="/price-info">금액 및 계좌번호</NavButton>
            <NavButton link="/reminder">상담 후 리마인더</NavButton>
            <NavButton link="/thanks">예약 완료</NavButton>
            <NavButton link="/survey">모니터링 설문</NavButton>
        </Nav>
    )
}

const Nav = styled.nav`
    display: flex;
    gap: 30px;
`

export default NavBar;

