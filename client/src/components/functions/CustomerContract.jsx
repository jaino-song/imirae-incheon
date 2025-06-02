import React, { useState, useEffect } from "react";
import { loadScripts, getDocumentOptions } from "../hooks/useDocAPI";
import styled from "@emotion/styled";
import useContractStore from "../../store/customerStore";

const CustomerContract = () => {
  const {
    customerName,
    customerContact,
    customerDOB,
    customerAddress,

    caretaker1Name,
    caretaker1Contact,

    startDate,
    endDate,
    contractDuration,

    paymentYear,
    paymentMonth,
    paymentDay,
    receiptYear,
    receiptMonth,
    receiptDay,

    setCustomerName,
    setCustomerContact,
    setCustomerDOB,
    setCustomerAddress,

    setCaretaker1Name,
    setCaretaker1Contact,

    setStartDate,
    setEndDate,
    setContractDuration,

    setPaymentYear,
    setPaymentMonth,
    setPaymentDay,
    setReceiptYear,
    setReceiptMonth,
    setReceiptDay,

  } = useContractStore();

  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [startMonth, setStartMonth] = useState('');
  const [startDay, setStartDay] = useState('');

  const [endYear, setEndYear] = useState(new Date().getFullYear());
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

  // create years array with the current year and the next year
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year <= currentYear + 1; year++) {
      years.push(year);
    }
    return years;
  }

  const months = [
    { value: "01", label: "1월" },
    { value: "02", label: "2월" },
    { value: "03", label: "3월" },
    { value: "04", label: "4월" },
    { value: "05", label: "5월" },
    { value: "06", label: "6월" },
    { value: "07", label: "7월" },
    { value: "08", label: "8월" },
    { value: "09", label: "9월" },
    { value: "10", label: "10월" },
    { value: "11", label: "11월" },
    { value: "12", label: "12월" }
  ];

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const generateDays = (month, year) => {
    if (!month || !year) return [];

    const y = parseInt(year);
    const m = parseInt(month);
    const lastDay = getLastDayOfMonth(y, m);

    return Array.from({ length: lastDay }, (_, i) => {
      const day = i + 1;
      const paddedDay = day.toString().padStart(2, '0');
      return {
        value: paddedDay,
        label: `${i + 1}일`
      };
    });
  };

  const handleNameChange = (e) => {
    setCustomerName(e.target.value);
  }

  const handleContactChange = (e) => {
    setCustomerContact(e.target.value);
  }

  const handleCustomerDOBChange = (e) => {
    setCustomerDOB(e.target.value);
  }

  const handleCustomerAddressChange = (e) => {
    setCustomerAddress(e.target.value);
  }

  const handleCaretaker1NameChange = (e) => {
    setCaretaker1Name(e.target.value);
  }

  const handleCaretaker1ContactChange = (e) => {
    setCaretaker1Contact(e.target.value);
  }

  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
    setStartMonth('');
    setStartDay('');
  }

  const handleStartMonthChange = (e) => {
    setStartMonth(e.target.value);
    setStartDay('');
  }

  const handleStartDayChange = (e) => {
    setStartDay(e.target.value);
  }

  const handleEndYearChange = (e) => {
    setEndYear(e.target.value);
    setEndMonth('');
    setEndDay('');
  }

  const handleEndMonthChange = (e) => {
    setEndMonth(e.target.value);
    setEndDay('');
  }

  const handleEndDayChange = (e) => {
    setEndDay(e.target.value);
  }

  const handlePaymentYearChange = (e) => {
    setPaymentYear(e.target.value);
  }

  const handlePaymentMonthChange = (e) => {
    setPaymentMonth(e.target.value);
  }

  const handlePaymentDayChange = (e) => {
    setPaymentDay(e.target.value);
  }

  const handleReceiptYearChange = (e) => {
    setReceiptYear(e.target.value);
  }

  const handleReceiptMonthChange = (e) => {
    setReceiptMonth(e.target.value);
  }

  const handleReceiptDayChange = (e) => {
    setReceiptDay(e.target.value);
  }

  useEffect(() => {
    if (startYear && startMonth && startDay) {
      setStartDate(`${startYear}${startMonth}${startDay}`);
    }
  }, [startYear, startMonth, startDay]);

  useEffect(() => {
    if (endYear && endMonth && endDay) {
      setEndDate(`${endYear}${endMonth}${endDay}`);
    }
  }, [endYear, endMonth, endDay]);

  useEffect(() => {
    if (startDate && endDate) {
      setContractDuration(`${startDate}~${endDate}`);
    }
  }, [startDate, endDate]);


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
    catch (err) {
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

        <H4>산모님 생년월일</H4>
        <InputField
          type="text"
          placeholder="생년월일 6자리 (YYMMDD)"
          onChange={handleCustomerDOBChange}
          value={customerDOB}
        />

        <H4>산모님 주소</H4>
        <InputField
          type="text"
          placeholder="산모님 주소를 입력하세요"
          onChange={handleCustomerAddressChange}
          value={customerAddress}
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
        <SelectBox value={startMonth} onChange={handleStartMonthChange} disabled={!startYear}>
          <option value="" disabled>
            선택하세요
          </option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </SelectBox>

        <h5>시작 일</h5>
        <SelectBox value={startDay} onChange={handleStartDayChange} disabled={!startMonth || !startYear}>
          <option value="" disabled>
            선택하세요
          </option>
          {generateDays(startMonth, startYear).map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </SelectBox>

        <h5>종료 년도</h5>
        <SelectBox value={endYear} onChange={handleEndYearChange}>
          {generateYearOptions().map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </SelectBox>

        <h5>종료 월</h5>
        <SelectBox value={endMonth} onChange={handleEndMonthChange} disabled={!endYear}>
          <option value="" disabled>
            선택하세요
          </option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </SelectBox>

        <h5>종료 일</h5>
        <SelectBox value={endDay} onChange={handleEndDayChange} disabled={!endMonth || !endYear}>
          <option value="" disabled>
            선택하세요
          </option>
          {generateDays(endMonth, endYear).map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </SelectBox>

        <h5>제공인력 1 성명</h5>
        <InputField
          type="text"
          placeholder="제공인력1의 이름을 입력하세요"
          onChange={handleCaretaker1NameChange}
          value={caretaker1Name}
        />

        <h5>제공인력 1 연락처</h5>
        <InputField
          type="text"
          placeholder="제공인력1의 연락처를 입력하세요"
          onChange={handleCaretaker1ContactChange}
          value={caretaker1Contact}
        />

        <h5>본인부담금 수령 년도</h5>
        <SelectBox value={startYear} onChange={handlePaymentYearChange}>
          {generateYearOptions().map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </SelectBox>

        <h5>본인부담금 수령 월</h5>
        <SelectBox value={startMonth} onChange={handlePaymentMonthChange} disabled={!paymentYear}>
          <option value="" disabled>
            선택하세요
          </option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </SelectBox>

        <h5>본인부담금 수령 일</h5>
        <SelectBox value={startDay} onChange={handlePaymentDayChange} disabled={!paymentYear || !paymentMonth}>
          <option value="" disabled>
            선택하세요
          </option>
          {generateDays(startMonth, startYear).map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </SelectBox>

        <h5>영수증 발급 년도</h5>
        <SelectBox value={startYear} onChange={handleReceiptYearChange}>
          {generateYearOptions().map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </SelectBox>

        <h5>영수증 발급 월</h5>
        <SelectBox value={startMonth} onChange={handleReceiptMonthChange} disabled={!receiptYear}>
          <option value="" disabled>
            선택하세요
          </option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </SelectBox>

        <h5>영수증 발급 일</h5>
        <SelectBox value={startDay} onChange={handleReceiptDayChange} disabled={!receiptMonth || !receiptDay}>
          <option value="" disabled>
            선택하세요
          </option>
          {generateDays(startMonth, startYear).map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </SelectBox>

        <h3>{contractDuration}</h3>

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