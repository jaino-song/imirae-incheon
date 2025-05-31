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
        type,
        days,
        area,
        fullPrice,
        grant,
        actualPrice
    } = useContractStore.getState();

    // Calculate contract dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(days));

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
                    "id": "계약 시작 년도",
                    "value": startDate.getFullYear().toString()
                },
                {
                    "id": "계약 시작 월",
                    "value": (startDate.getMonth() + 1).toString()
                },
                {
                    "id": "계약 시작 일",
                    "value": startDate.getDate().toString()
                },
                {
                    "id": "계약 종료 년도",
                    "value": endDate.getFullYear().toString()
                },
                {
                    "id": "계약 종료 월",
                    "value": (endDate.getMonth() + 1).toString()
                },
                {
                    "id": "계약 종료 일",
                    "value": endDate.getDate().toString()
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
                    "value": "담당자 이름"
                },
                {
                    "id": "제공인력 1 연락처",
                    "value": "담당자 연락처"
                },
                {
                    "id": "제공인력2 성명",
                    "value": "담당자2 이름"
                },
                {
                    "id": "제공인력2 연락처",
                    "value": "담당자2 연락처"
                },
                {
                    "id": "제공인력2 변경일",
                    "value": new Date().toISOString().split('T')[0]
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