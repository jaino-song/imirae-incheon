import { useState } from "react";
import NameOnlyMainContent from '../MainContent/NameOnlyMainContent';

const Thanks = () => {
    const [preText] = useState(
        `[인천 아이미래로]
입금 확인/예약 확정 완료

{name} 산모님 ~♡

입금 확인 되었고, 예약도 완료 되었습니다~!

궁금하신 점 있으시면 
언제든지 연락 주시고요~

산모님의 서비스를 잘 준비하고 있겠습니다 :)

예쁜 아가 순산하시면 연락주세요~

감사합니다~!`
    );

    return (
        <NameOnlyMainContent
            title="예약 확정 완료"
            desc="해당 항목들을 모두 작성 및 선택 후에 하단에 있는 문자 생성 버튼을 클릭해 주세요"
            preText={preText}
        />
    );
};

export default Thanks;