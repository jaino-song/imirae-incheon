import { useState } from "react";
import NameOnlyMainContent from '../MainContent/NameOnlyMainContent';

const CustomerContract = () => {
    const [preText] = useState(
        `[인천 아이미래로]

{name} 산모님 ~♡

서비스 받으시는 기간 동안 행복한 시간이 되셨나요?

산모신생아건강관리서비스 이용에 대한 모니터링 설문 링크 보내드립니다~ 
서비스 종료에 꼭 필요한 단계이오니 7일 이내로 모니터링 설문을 완료해 주세요~

산모님 가정에 항상 행복과 평안이 가득하길 바라겠습니다 :)

모니터링 설문 링크: https://naver.me/5S9fl3OP
`
    );

    return (
        <NameOnlyMainContent
            title="모니터링 설문"
            desc="해당 항목들을 모두 작성 및 선택 후에 하단에 있는 문자 생성 버튼을 클릭해 주세요"
            preText={preText}
        />
    );
};

export default CustomerContract;