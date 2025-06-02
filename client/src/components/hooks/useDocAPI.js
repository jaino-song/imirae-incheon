import { act } from 'react';
import useContractStore from '../../store/customerStore';

// Function to load external scripts
export const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  // Load both scripts
  export const loadScripts = async () => {
    try {
      await loadScript('https://www.eformsign.com/plugins/jquery/jquery.min.js');
      await loadScript('https://www.eformsign.com/lib/js/efs_embedded_v2.js');
    } catch (error) {
      console.error('Error loading eFormSign scripts:', error);
    }
  };

  export const getDocumentOptions = () => {
    const {
        customerName,
        customerContact,
        customerDOB,
        customerAddress,

        caretaker1Name,
        caretaker1Contact,

        type,
        days,
        area,
        duration,

        startYear,
        startMonth,
        startDay,
        startDate,
        
        endYear,
        endMonth,
        endDay,
        endDate,

        fullPrice,
        grant,
        actualPrice
    } = useContractStore.getState();

    return {
        "company": {
            "id": "6635b9dacdbc4837ba378c6336ef1e34",
            "country_code": "kr",
            "user_key": "forchildrenbysongs@gmail.com"
        },
        "user": {
            "type": "01",
            "id": "forchildrenbysongs@gmail.com"
        },
        "mode": {
            "type": "01",
            "template_id": "d1591da29590495d800f55f1d1fc1378"
        },
        "prefill": {
            "fields": [
                {
                    "id": "이용자 성명",
                    "value": customerName
                },
                {
                    "id": "이용자 생년월일",
                    "value": customerDOB
                },
                {
                    "id": "이용자 주소",
                    "value": customerAddress
                },
                {
                    "id": "계약 시작 년도",
                    "value": startYear
                },
                {
                    "id": "계약 시작 월",
                    "value": startMonth
                },
                {
                    "id": "계약 시작 일",
                    "value": startDay
                },
                {
                    "id": "계약 종료 년도",
                    "value": endYear
                },
                {
                    "id": "계약 종료 월",
                    "value": endMonth
                },
                {
                    "id": "계약 종료 일",
                    "value": endDay
                },
                {
                    "id": "서비스 비용",
                    "value": fullPrice
                },
                {
                    "id": "정부지원금",
                    "value": grant
                },
                {
                    "id": "본인부담금",
                    "value": actualPrice
                },
                {
                    "id": "서비스 기간",
                    "value": days
                },
                {
                    "id": "제공인력 1 성명",
                    "value": caretaker1Name
                },
                {
                    "id": "제공인력 1 연락처",
                    "value": caretaker1Contact
                },
                {
                    "id": "서비스 가격",
                    "value": fullPrice
                },
                {
                    "id": "정부지원금",
                    "value": grant
                },
                {
                    "id": "본인부담금",
                    "value": actualPrice
                },
                {
                    "id": "본인부담금 수령 년도",
                    "value": new Date().getFullYear().toString()
                },
                {
                    "id": "본인부담금 수령 월",
                    "value": (new Date().getMonth() + 1).toString()
                },
                {
                    "id": "본인부담금 수령 일",
                    "value": new Date().getDate().toString()
                },
                {
                    "id": "영수증 년도",
                    "value": new Date().getFullYear().toString()
                },
                {
                    "id": "영수증 월",
                    "value": (new Date().getMonth() + 1).toString()
                },
                {
                    "id": "영수증 일",
                    "value": new Date().getDate().toString()
                }
            ]
        }
    };
  };