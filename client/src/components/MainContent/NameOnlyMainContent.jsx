import { useState } from "react";
import styled from "@emotion/styled";
import FormContainer from "../FormContainer/FormContainer";

const NameOnlyMainContent = (props) => {
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState('');

    const handleNameChange = (e) => {
        const name = e.target.value;
        // Replace {name} in the template with the actual name
        const completedMsg = props.preText.replace('{name}', name);
        setMsg(completedMsg);
    };

    const handleCreateMsgButton = () => {
        setShowMsg(true);
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            setShowMsg(true);
        }
    }

    return (
        <Container>
            <Title>{props.title}</Title>
            <Description>{props.desc}</Description>

            <InputField 
                type="text"
                placeholder="산모님 이름을 입력하세요"
                onChange={handleNameChange}
                onKeyDown={handleEnterPress}
            />
            <CreateMsgButton onClick={handleCreateMsgButton}>
                메시지 생성
            </CreateMsgButton>

            { showMsg ? <FormContainer msg={msg} /> : null }
        </Container>
    );
};

// Styled components
const Container = styled.div`
    padding: 2rem;
    max-width: 900px;
    margin: 2% auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 30px;
    height: 70%;

    @media (max-width: 1200px) {
        max-width: 900px;
        width: 80%;
    }

    @media (max-width: 768px) {
        max-width: 700px;
        width: 80%;
    }
    
    @media (max-width: 480px) {
        max-width: 500px;
        width: 80%;
    }`;

const Title = styled.h1`
    color: #007bff;
    font-size: 2.5rem;
    margin: 0;
    
    @media (min-width: 1200px) {
            margin-top: 2rem;
        }

    @media (max-width: 1200px) {
        font-size: 2rem;
    }

        
`;

const Description = styled.p`
    color: #6c757d;
    margin-bottom: 2rem;
`;

const InputField = styled.input`
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const CreateMsgButton = styled.button`
    padding: 0.5rem 1rem;
    margin: 2rem;
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
`

export default NameOnlyMainContent;