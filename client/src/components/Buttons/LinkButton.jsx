import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const LinkButton = ({ routeLink, children, TextStyle, BtnStyle, disabled }) => {
    return (
        <Link to={disabled ? '#' : routeLink} style={{ pointerEvents: disabled, textDecoration: 'none' }}>
            <BtnStyle disabled={disabled}>
                <TextStyle>{ children }</TextStyle>
            </BtnStyle>
        </Link>
    )
}

export default LinkButton;