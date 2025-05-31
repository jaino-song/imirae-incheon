import React, { useState, useEffect } from "react";
import { loadScripts, getDocumentOptions } from "../hooks/useDocAPI";
import styled from "@emotion/styled";
import useContractStore from "../../store/customerStore";

const CustomerContract = () => {
    const {
      customerName,
      customerContact,
      setCustomerName,
      setCustomerContact,
      setStartDate,
      setEndDate
    } = useContractStore();

    const [startYear, setStartYear] = useState(new Date().getFullYear());
    const [startMonth, setStartMonth] = useState('');
    const [startDay, setStartDay] = useState('');

    const [endYear, setEndYear] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endDay, setEndDay] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      loadScripts();

      return () => {
        const scripts = document.querySelectorAll('script[src*="eformsign.com"]');
        scripts.forEach(script => script.remove());
      };
    }, []); // Empty dependency array means this runs once on mount

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year <= currentYear + 1; year++) {
      years.push(year);
    }
    return years;
  }

  const months = [
    { value: "1", label: "1월" },
    { value: "2", label: "2월" },
    { value: "3", label: "3월" },
    { value: "4", label: "4월" },
    { value: "5", label: "5월" },
    { value: "6", label: "6월" },
    { value: "7", label: "7월" },
    { value: "8", label: "8월" },
    { value: "9", label: "9월" },
    { value: "10", label: "10월" },
    { value: "11", label: "11월" },
    { value: "12", label: "12월" }
];
 
  const handleNameChange = (e) => {
    setCustomerName(e.target.value);
  }

  const handleContactChange = (e) => {
    setCustomerContact(e.target.value);
  }

  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
  }

  const handleStartMonthChange = (e) => {
    setStartMonth(e.target.value);
  }

  const handleStartDayChange = (e) => {
    setStartDay(e.target.value);
  }

  const handleEndYearChange = (e) => {
    setEndYear(e.target.value);
  }

  const handleEndMonthChange = (e) => {
    setEndMonth(e.target.value);
  }

  const handleEndDayChange = (e) => {
    setEndDay(e.target.value);
  }



  const handleCreateContract = () => {
    if (!customerName || !customerContact) {
      alert('산모님 성함과 휴대전화 번호를 모두 입력해주세요');
      return;
    }

    setIsLoading(true);

    try {
      const eformsign = new window.EformSignDocument();
      const documentOptions = getDocumentOptions(); // Get fresh options with current store values

      const success_callback = (res) => {
        console.log('Document Creation Successful', res);
        alert('계약서가 성공적으로 전송되었습니다');
        setIsLoading(false);
      };

      const error_callback = (res) => {
        console.error("Error creating document", res);
        alert('계약서 전송 중 오류가 발생했습니다');
        setIsLoading(false);
      };

      const action_callback = (res) => {
        console.log('Action callback: ', res);
      };

      eformsign.document(
        documentOptions,
        "eformsign_iframe",
        success_callback,
        error_callback,
        action_callback
      );
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
                value={customerName}
            />
            <H4>산모님 휴대전화 번호</H4>
            <InputField
                type="text"
                placeholder="산모님 휴대전화 번호을 입력하세요"
                onChange={handleContactChange}
                value={customerContact}
            />
            <H4>계약 기간</H4>
            <h5>시작 년도</h5>
            <SelectBox value={startYear} onChange={handleStartYearChange}>
                {generateYearOptions().map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
            </SelectBox>
            <h5>시작 월</h5>
            <SelectBox value={startMonth} onChange={handleStartMonthChange}>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
            </SelectBox>
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

const SelectBox = styled.select`
  padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
    margin-bottom: 1rem;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`

export default CustomerContract;