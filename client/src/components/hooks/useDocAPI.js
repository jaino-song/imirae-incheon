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

  export const document_option = {
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
              "id": "계약 시작 년도",
              "value": customerContact
            },
            {
              "id": "계약 시작 월",
              "value": customerContact
            },
            {
              "id": "계약 시작 일",
              "value": customerContact
            },
            {
              "id": "계약 종료 년도",
              "value": customerContact
            },
            {
              "id": "계약 종료 월",
              "value": customerContact
            },
            {
              "id": "계약 종료 일",
              "value": customerContact
            },
            {
              "id": "서비스 비용",
              "value": customerContact
            },
            {
              "id": "정부지원금",
              "value": customerContact
            },
            {
              "id": "본인부담금",
              "value": customerContact
            },
            {
              "id": "제공인력 1 성명",
              "value": customerContact
            },
            {
              "id": "제공인력 1 연락처",
              "value": customerContact
            },
            {
              "id": "제공인력2 성명",
              "value": customerContact
            },
            {
              "id": "제공인력2 연락처",
              "value": customerContact
            },
            {
              "id": "제공인력2 변경일",
              "value": customerContact
            },
            {
              "id": "서비스 기간",
              "value": customerContact
            },
            {
              "id": "본인부담금 수령 년도",
              "value": customerContact
            },
            {
              "id": "본인부담금 수령 월",
              "value": customerContact
            },
            {
              "id": "본인부담금 수령 일",
              "value": customerContact
            },
            {
              "id": "영수증 년도",
              "value": customerContact
            },
            {
              "id": "영수증 월",
              "value": customerContact
            },
            {
              "id": "영수증 일",
              "value": customerContact
            },
        ]
    }
  }