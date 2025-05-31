import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import LinkButton from "../Buttons/LinkButton";

const NavButton = ({ link, children }) => {
    return (
        <LinkButton routeLink={link} TextStyle={H3} BtnStyle={Button} children={children} />
    )
}

const Button = styled.button`
    display: block;
`

const H3 = styled.h3`
    display: block;
    font-size: 1.17em;
    font-weight: bold;
    margin: 1em;
`

export default NavButton;