import { useState, useEffect } from "react";
import MainContent from "../MainContent/MainContent";

const Greetings = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const [text] = useState(
        `[인천 아이미래로]
        안녕하세요, 인천 아이미래로 입니다 :)
            
        인천 아이미래로에선 아기들의 건강과 엄마들의 안정을 최우선으로 하는 
        전문적인 산모 및 신생아 관리프로그램을 약속드립니다.
            
        ▶문의
           - 남인천(미추홀구,남동구, 연수구, 동구)
             032-442-5992
            
           - 서인천(계양구,서구, 중구)
             032-327-6992
            
           - 부평구
             032-262-5992
            
        ▶공식사이트
           www.imirae-incheon.com
        
        ▶서비스 후기 더 보기
           blog.naver.com/imirae-incheon`
    );
    return (
        <MainContent
            title="첫인사"
            desc="하단의 문자 생성 버튼을 클릭해 주세요"
            msg={text}
        />
    )
}

export default Greetings;