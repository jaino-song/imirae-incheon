import styled from "@emotion/styled";
import useClipboard from "../hooks/useClipboard";
import { useState, useEffect } from "react";

const FormContainer = (props) => {
    const { copyToClipboard } = useClipboard();
    const [text, setText] = useState(props.msg);

    useEffect(() => {
        setText(props.msg);
    }, [props.msg]);

    const handleCopyClick = () => {
        copyToClipboard(props.msg);
        alert('클립보드에 복사되었습니다');
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    return (
        <Container isGrayedOut={props.isGrayedOut}>
            <Textarea
                value={text}
                onChange={handleTextChange}
                rows={25}
                cols={50}
            />
            
            <CopyButton onClick={handleCopyClick}>
                메시지 복사
            </CopyButton>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 90%;
    height: 60vh;
    margin: 1rem;
    opacity: ${(props) => (props.isGrayedOut ? 0.5 : 1)};
    filter: ${(props) => (props.isGrayedOut ? "grayscale(100%)" : "none")};
    pointer-events: ${(props) => (props.isGrayedOut ? "none" : "auto")};
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 1rem;
    border: 1px solid #dee2e6;
    border-radius: 30px;
    font-family: Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    resize: vertical;
    background-color: #ffffff;
    color: #212529;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const CopyButton = styled.button`
    margin: 2rem;
    width: 50vw;
    min-width: 150px;
    padding: 1rem 2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }
`;

export default FormContainer;