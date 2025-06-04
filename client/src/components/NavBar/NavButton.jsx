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
    border-radius: 100px;
    border: none;
    background-color: #fff;
    font-size: 1em;
    font-weight: bold;
    margin: 0.5em;
    color: #000;
    text-decoration: none;
    cursor: pointer;
`

const H3 = styled.h3`
    display: block;
    font-size: 1.17em;
    font-weight: bold;
    margin: 1em;
    text-decoration: none;
`

export default NavButton;