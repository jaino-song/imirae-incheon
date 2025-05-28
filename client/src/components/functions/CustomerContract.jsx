import { useState, useEffect } from "react";
import { loadScripts } from "../hooks/useDocAPI";
import styled from "@emotion/styled";

const CustomerContract = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerContact, setCustomerContact] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
    if (!customerName || !customerContact) {
      alert('산모님 성함과 휴대전화 번호를 모두 입력해주세요');
      return;
    }

    setIsLoading(true);

    try {
      const eformsign = new EformSignDocument();

      const document_option = {
        "company": {
                "id": "6635b9dacdbc4837ba378c6336ef1e34", // Replace with your company ID
                "country_code": "kr",
                "user_key": "forchildrenbysongs@gmail.com" // Replace with your user key
        },
        "user": {
            "type": "01",
            "id": "forchildrenbysongs@gmail.com" // Replace with your email
        },
        "mode": {
            "type": "01", // Template document creation mode
            "template_id": "d1591da29590495d800f55f1d1fc1378" // Replace with your template ID
        },
        "prefill": {
            "fields": [
                {
                    "id": "이용자 성명",
                    "value": customerName
                },
                {
                    "id": "이용자 생년월일",
                    "value": customerContact
                },
                {
                  "id": "이용자 주소",
                  "value": customerContact
              },
            ]
        }
      }

      const success_callback = function(res) {
        console.log('Document Creation Successful', res);
        alert('계약서가 성공적으로 전송되었습니다');
        setIsLoading(false);
      };

      const error_callback = function(res) {
        console.error("Error creating document", res);
        alert('계약서 전송 중 오류가 발생했습니다');
        setIsLoading(false);
      };

      const action_callback = function(res) {
        console.log('Action callback: ', res);
      };

      eformsign.document(document_option, "eformsign_iframe", success_callback, error_callback, action_callback);
      eformsign.open();
    }
    catch(err) {
      console.error('Error initializing eFormSign: ', err);
      alert('계약서 전송 중 오류가 발생했습니다');
      setIsLoading(false);
    }
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
                disabled={isLoading}
            >
                {isLoading ? '전송 중...' : '계약서 전송'}
            </CreateMsgButton>
            <iframe id="eformsign_iframe" style={{ display: 'none' }} />
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