import styled from "@emotion/styled";
import useClipboard from "../hooks/useClipboard";

const FormContainer = (props) => {
    const { copyToClipboard } = useClipboard();

    const handleCopyClick = () => {
        copyToClipboard(props.msg);
        alert('클립보드에 복사되었습니다');
    };

    return (
        <Container>
            <Textarea
                value={props.msg}
                readOnly
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
    gap: 1rem;
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 1rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
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
    padding: 1rem 2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

export default FormContainer;