import styled from "@emotion/styled";
import LinkButton from "../Buttons/LinkButton";

const MobileNavButton = ({ link, children, onClick }) => {
    return (
        <LinkButton routeLink={link} TextStyle={H3} BtnStyle={Button} children={children} onClick={onClick} />
    )
}

const Button = styled.button`
    font-size: 0.8em;
    font-weight: bold;
    color: #000;
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;
    border: none;
`

const H3 = styled.h3`
    display: block;
    font-size: 1.17em;
    font-weight: bold;
    margin: 1em;
    text-decoration: none;
`

export default MobileNavButton;