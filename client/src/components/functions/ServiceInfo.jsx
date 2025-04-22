import { useState } from "react";
import NameOnlyMainContent from '../MainContent/NameOnlyMainContent';

const ServiceInfo = () => {
    const [preText] = useState(
        `[인천 아이미래로]
{name} 산모님~♡

산후관리서비스 관련 
안내사항 보내드립니다 :)

▶관리사님의 근무시간은 오전 9시부터 오후 6시까지이며 
점심 식사 시간이 포함된 1시간 휴게시간이 있습니다.

휴게시간은 산모님과 관리사님이 서로 잘 조율하셔서 사용하시면 됩니다^^ 

▶관리사님께서 하시는 주 업무는 
신생아 케어 (신생아 목욕, 신생아 빨래, 수유, 젖병 삶기 등),
산모 음식 준비, 
아기와 산모가 머무는 방의 청소와 거실과 
화장실의 간단한 청소 등의 일들을 하시는데 
묵은 빨래, 대청소, 베란다 청소 등의 
과중한 일들은 하지 않으십니다.

그 외 산모님께서 도움이 필요한 일이 생겼을 시에, 
그때그때 말씀하시면 거의 다 도와드립니다 :)

그리고 산모님께서 젖몸살이 오면 케어해주십니다^^

궁금하신 점 있으시면 언제든지 문자 또는 연락 주세요 :)

감사합니다.`
    );

    return (
        <NameOnlyMainContent
            title="서비스 소개"
            desc="해당 항목들을 모두 작성 및 선택 후에 하단에 있는 문자 생성 버튼을 클릭해 주세요"
            preText={preText}
        />
    );
};

export default ServiceInfo;