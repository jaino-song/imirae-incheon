import { useState, useEffect } from "react";
import { loadScripts } from "../hooks/useDocAPI";
import styled from "@emotion/styled";

const CustomerContract = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerContact, setCustomerContact] = useState('');
    useEffect(() => {

    loadScripts();

    return () => {
      const scripts = document.querySelectorAll('script[src*="eformsign.com"]');
      scripts.forEach(script => script.remove());
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleNameChange = (e) => {
    setCustomerName(e.target.value);
  }

  const handleContactChange = (e) => {
    setCustomerContact(e.target.value);
  }

  const handleCreateContract = () => {

  }

  return (
    <div>
        <Container>
            <H4>산모님 성함</H4>
            <InputField
                type="text"
                placeholder="산모님 이름을 입력하세요"
                onChange={handleNameChange}
            />
            <H4>산모님 휴대전화 번호</H4>
            <InputField
                type="text"
                placeholder="산모님 휴대전화 번호을 입력하세요"
                onChange={handleContactChange}
            />
            <CreateMsgButton
                onClick={handleCreateContract}
            >
                계약서 전송
            </CreateMsgButton>
        </Container>

    </div>
  );
};

const Container = styled.div`
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
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

    &:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }
`;

const H4 = styled.h4`

`

export default CustomerContract;