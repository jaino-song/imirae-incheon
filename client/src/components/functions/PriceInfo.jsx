import PriceMainContent from "../MainContent/PriceMainContent";

const PriceInfo = () => {
    const preText = `[인천 아이미래로]

{name} 산모님~♡ 
예약금 관련해서 안내 드립니다 :)

서비스 기간: 
    출퇴근 {weeks}주 (평일기준 {days}일)
정부지원 바우처 유형: 
    {type}

기본 서비스 금액은 
총 {fullPrice}원이며, 
정부 지원금액은 
{grant}원 입니다.

산모님께서 부담하시는 금액은 
{actualPrice}원 입니다.

서비스 예약을 위해 
선납하실 예약금은 
100,000원 입니다.

예약금 입금 후에 
서비스 예약이 확정 됩니다.

입금 계좌번호: 
{bankName} {accNum}
예금주: 인천 아이미래로 (김정인)

입금시 입금자명을 꼭 기재해 주세요 :)
(타인 계좌에서 송금시 산모님 성함 기재 필수)

감사합니다.`
    return (
        <PriceMainContent 
            title="금액 및 계좌번호" 
            desc="해당 항목들을 모두 작성 및 선택 후에 하단에 있는 문자 생성 버튼을 클릭해 주세요"
            preText={preText}
        />
    )
}

export const voucherOptions = [
    {
        group: "A형 첫째아",
        options: [
            { value: 'A가1형', label: "A가-1형", duration: "short" },
            { value: 'A통합1형', label: "A통합-1형", duration: "short" },
            { value: 'A라1형', label: "A라-1형", duration: "short" },
        ]
    },
    {
        group: "A형 둘째아",
        options: [
            { value: 'A가2형', label: "A가-2형"},
            { value: 'A통합2형', label: "A통합-2형"},
            { value: 'A라2형', label: "A라-2형"},
        ]
    },
    {
        group: "A형 셋째아",
        options: [
            { value: 'A가3형', label: "A가-3형"},
            { value: 'A통합3형', label: "A통합-3형"},
            { value: 'A라3형', label: "A라-3형"},
        ]
    },
    {
        group: "쌍생아 인력 1",
        options: [
            { value: 'B가1형', label: "B가-1형"},
            { value: 'B통합1형', label: "B통합-1형"},
            { value: 'B라1형', label: "B라-1형"},
        ]
    },
    {
        group: "쌍생아 인력 2",
        options: [
            { value: 'B가2형', label: "B가-2형"},
            { value: 'B통합2형', label: "B통합-2형"},
            { value: 'B라2형', label: "B라-2형"},
        ]
    },
    {
        group: "삼태아 인력 2",
        options: [
            { value: 'C가1형', label: "C가-1형", duration: "long" },
            { value: 'C통합1형', label: "C통합-1형", duration: "long" },
            { value: 'C라1형', label: "C라-1형", duration: "long" },
        ]
    },
    {
        group: "삼태아 인력 3",
        options: [
            { value: 'C가2형', label: "C가-2형", duration: "long" },
            { value: 'C통합2형', label: "C통합-2형", duration: "long" },
            { value: 'C라2형', label: "C라-2형", duration: "long" },
        ]
    },
]

export const dateOptions = [
    {
        group: "초산단태아",
        options: [
            { value: 5 },
            { value: 10 },
            { value: 15 },
        ]
    },
    {
        group: "둘째아이상",
        options: [
            { value: 10 },
            { value: 15 },
            { value: 20 },
        ]
    },
    {
        group: "삼태아이상",
        options: [
            { value: 15 },
            { value: 20 },
            { value: 40 },
        ]
    },
]

export const areaOptions = [
    { value: 'Namdonggu', label: '남동구' },
    { value: 'Seogu', label: '서구' },
    { value: 'Bupyunggu', label: '부평구' },
    { value: 'Yeonsuguㅌ₩', label: '연수구' }
]

export default PriceInfo;