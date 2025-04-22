import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const NavButton = ({ link, children }) => {
    return (
        <Link to={link}>
            <Button>
                <H3>{ children }</H3>
            </Button>
        </Link>
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