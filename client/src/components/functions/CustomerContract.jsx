import React, { useState, useEffect, useCallback } from "react";
import { loadScripts, getDocumentOptions } from "../hooks/useDocAPI";
import useEformsignAuth from "../hooks/useEformsignAuth";
import styled from "@emotion/styled";
import useContractStore from "../../store/customerStore";

// Using global states inside a zustand store
const CustomerContract = () => {
  const {
    customerName,
    customerContact,
    customerDOB,
    customerAddress,

    caretaker1Name,
    caretaker1Contact,

    startYear,
    startMonth,
    startDay,
    startDate,

    endYear,
    endMonth,
    endDay,
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

    setStartYear,
    setStartMonth,
    setStartDay,
    setStartDate,

    setEndYear,
    setEndMonth,
    setEndDay,
    setEndDate,
    setContractDuration,

    setPaymentYear,
    setPaymentMonth,
    setPaymentDay,
    setReceiptYear,
    setReceiptMonth,
    setReceiptDay,

  } = useContractStore();

  // eformsign auth hook
  const {
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading: authLoading,
    getAccessToken,
    refreshAccessToken
  } = useEformsignAuth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadScripts();

    return () => {
      const scripts = document.querySelectorAll('script[src*="eformsign.com"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading && !isLoading) {
      getAccessToken().catch(error => {
        console.error('초기 토큰 발급 실패:', error);
      });
    }
  }, [isAuthenticated, authLoading, getAccessToken, isLoading]);

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

  // Memoize callbacks to prevent re-creation on every render unless dependencies change
  const success_callback = useCallback((res) => {
    console.log('[eformsign_useEffect] success_callback triggered.', res);
    alert('계약서가 성공적으로 전송되었습니다');
    setIsLoading(false);
  }, [setIsLoading]);

  const error_callback = useCallback(async (res, eformsignInstance) => {
    console.error("[eformsign_useEffect] error_callback triggered.", res);
    if (res.code === 401 || res.code === 403) {
      try {
        console.log('[eformsign_useEffect] Token expired/invalid, attempting refresh...');
        await refreshAccessToken();
        console.log('[eformsign_useEffect] Token refresh successful, retrying document...');
        
        const newAccessToken = localStorage.getItem('eformsign_access_token') || accessToken;
        const newRefreshToken = localStorage.getItem('eformsign_refresh_token') || refreshToken;

        const newDocumentOptions = getDocumentOptions(newAccessToken, newRefreshToken);
        console.log('[eformsign_useEffect] New Document Options after refresh:', JSON.stringify(newDocumentOptions, null, 2));
        
        if (eformsignInstance) {
            eformsignInstance.document(
              newDocumentOptions,
              "eformsign_iframe",
              success_callback,
              (retryRes) => error_callback(retryRes, eformsignInstance),
              action_callback
            );
            eformsignInstance.open();
        } else {
            console.error('[eformsign_useEffect] eformsignInstance not available for retry.');
            alert('토큰 갱신 후 문서 재시도에 실패했습니다. eformsign 객체를 확인해주세요.');
            setIsLoading(false);
        }
        return;
      } catch (refreshError) {
        console.error('[eformsign_useEffect] Token refresh failed:', refreshError);
      }
    }
    alert('계약서 전송 중 오류가 발생했습니다: ' + (res.message || JSON.stringify(res)));
    setIsLoading(false);
  }, [refreshAccessToken, success_callback, accessToken, refreshToken, setIsLoading]);

  const action_callback = useCallback((res) => {
    console.log('[eformsign_useEffect] action_callback triggered: ', res);
  }, []);

  useEffect(() => {
    if (isLoading && isAuthenticated) {
      console.log('[eformsign_useEffect] isLoading is true and authenticated. Initializing eformsign.');
      
      console.log('[eformsign_useEffect] Is EformSignDocument available on window?', typeof window.EformSignDocument);
      if (typeof window.EformSignDocument === 'undefined') {
          alert('eformsign SDK (EformSignDocument) is not loaded. Please check console for script loading errors.');
          setIsLoading(false);
          return;
      }

      const eformsignInstance = new window.EformSignDocument();
      console.log('[eformsign_useEffect] EformSignDocument instantiated.');

      const documentOptions = getDocumentOptions(accessToken, refreshToken);
      console.log('[eformsign_useEffect] Document Options for eformsign:', JSON.stringify(documentOptions, null, 2)); 
      
      try {
        console.log('[eformsign_useEffect] Calling eformsign.document()...');
        eformsignInstance.document(
          documentOptions,
          "eformsign_iframe",
          success_callback,
          (res) => error_callback(res, eformsignInstance),
          action_callback
        );
        console.log('[eformsign_useEffect] Finished eformsign.document(). Calling eformsign.open()...');
        eformsignInstance.open();
        console.log('[eformsign_useEffect] Finished eformsign.open(). eformsign UI should load in iframe.');
      } catch (sdkError) {
        console.error('[eformsign_useEffect] Error during eformsign SDK calls (document/open): ', sdkError);
        alert('eformsign SDK 초기화 중 오류 발생: ' + sdkError.message);
        setIsLoading(false);
      }
    }
  }, [isLoading, isAuthenticated, accessToken, refreshToken, getDocumentOptions, success_callback, error_callback, action_callback, setIsLoading]);

  const handleCreateContract = async () => {
    console.log('[handleCreateContract] Clicked.');
    if (!customerName || !customerContact) {
      alert('산모님 성함과 휴대전화 번호를 모두 입력해주세요');
      return;
    }

    console.log('[handleCreateContract] Checking authentication...');
    if (!isAuthenticated) {
      try {
        console.log('[handleCreateContract] Not authenticated, attempting to get access token...');
        await getAccessToken();
        console.log('[handleCreateContract] Access token obtained. Now setting isLoading to true.');
        setIsLoading(true);
      } catch (error) {
        alert('인증에 실패했습니다. 관리자에게 문의하세요.');
        return;
      }
    } else {
        setIsLoading(true);
        console.log('[handleCreateContract] Already authenticated. setIsLoading(true) - Modal should be visible.');
    }
  }

  return (
    <div>
      <Container>
        <H4>산모님 성함</H4>
        <InputField
          type="text"
          placeholder="산모님 이름을 입력하세요"
          onChange={(e) => setCustomerName(e.target.value)}
          value={customerName}
        />

        <H4>산모님 휴대전화 번호</H4>
        <InputField
          type="text"
          placeholder="산모님 휴대전화 번호을 입력하세요"
          onChange={(e) => setCustomerContact(e.target.value)}
          value={customerContact}
        />

        <H4>산모님 생년월일</H4>
        <InputField
          type="text"
          placeholder="생년월일 6자리 (YYMMDD)"
          onChange={(e) => setCustomerDOB(e.target.value)}
          value={customerDOB}
        />

        <H4>산모님 주소</H4>
        <InputField
          type="text"
          placeholder="산모님 주소를 입력하세요"
          onChange={(e) => setCustomerAddress(e.target.value)}
          value={customerAddress}
        />

        <H4>계약 기간</H4>
        <h5>시작 년도</h5>
        <SelectBox value={startYear} onChange={(e) => setStartYear(e.target.value)}>
          {generateYearOptions().map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </SelectBox>

        <h5>시작 월</h5>
        <SelectBox value={startMonth} onChange={(e) => setStartMonth(e.target.value)} disabled={!startYear}>
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
        <SelectBox value={startDay} onChange={(e) => setStartDay(e.target.value)} disabled={!startMonth || !startYear}>
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
        <SelectBox value={endYear} onChange={(e) => setEndYear(e.target.value)}>
          {generateYearOptions().map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </SelectBox>

        <h5>종료 월</h5>
        <SelectBox value={endMonth} onChange={(e) => setEndMonth(e.target.value)} disabled={!endYear}>
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
        <SelectBox value={endDay} onChange={(e) => setEndDay(e.target.value)} disabled={!endMonth || !endYear}>
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
          onChange={(e) => setCaretaker1Name(e.target.value)}
          value={caretaker1Name}
        />

        <h5>제공인력 1 연락처</h5>
        <InputField
          type="text"
          placeholder="제공인력1의 연락처를 입력하세요"
          onChange={(e) => setCaretaker1Contact(e.target.value)}
          value={caretaker1Contact}
        />

        <h5>본인부담금 수령 년도</h5>
        <SelectBox value={paymentYear} onChange={(e) => setPaymentYear(e.target.value)}>
          {generateYearOptions().map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </SelectBox>

        <h5>본인부담금 수령 월</h5>
        <SelectBox value={paymentMonth} onChange={(e) => setPaymentMonth(e.target.value)} disabled={!paymentYear}>
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
        <SelectBox value={paymentDay} onChange={(e) => setPaymentDay(e.target.value)} disabled={!paymentYear || !paymentMonth}>
          <option value="" disabled>
            선택하세요
          </option>
          {generateDays(paymentMonth, paymentYear).map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </SelectBox>

        <h5>영수증 발급 년도</h5>
        <SelectBox value={receiptYear} onChange={(e) => setReceiptYear(e.target.value)}>
          {generateYearOptions().map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </SelectBox>

        <h5>영수증 발급 월</h5>
        <SelectBox value={receiptMonth} onChange={(e) => setReceiptMonth(e.target.value)} disabled={!receiptYear}>
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
        <SelectBox value={receiptDay} onChange={(e) => setReceiptDay(e.target.value)} disabled={!receiptMonth || !receiptYear}>
          <option value="" disabled>
            선택하세요
          </option>
          {generateDays(receiptMonth, receiptYear).map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </SelectBox>

        <h3>{contractDuration}</h3>

        <CreateMsgButton
          onClick={handleCreateContract}
          disabled={isLoading || authLoading}
        >
          {isLoading ? '계약서 처리 중...' : (authLoading ? '인증 중...' : '계약서 전송')}
        </CreateMsgButton>
          
        {isLoading && (
          <ModalBackdrop onClick={() => setIsLoading(false)}>
            <ModalContent>
              <iframe 
                id="eformsign_iframe" 
                width="1440"
                height="1024"
                style={{ border: 'none' }}
              />
            </ModalContent>
          </ModalBackdrop>
        )}
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

// New Styled Components for Modal
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Ensure it's on top
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%; // Or a fixed width like 1200px
  height: 90%; // Or a fixed height like 800px
  max-width: 1440px; // Corresponds to original iframe width
  max-height: 1024px; // Corresponds to original iframe height
  display: flex; // To help center iframe if it's smaller
  flex-direction: column; // Stack elements if you add a close button later
`;

export default CustomerContract;