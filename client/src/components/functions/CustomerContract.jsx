import { useState, useEffect } from "react";
import { loadScripts } from "../hooks/useDocAPI";

const CustomerContract = () => {
  useEffect(() => {

    loadScripts();

    return () => {
      const scripts = document.querySelectorAll('script[src*="eformsign.com"]');
      scripts.forEach(script => script.remove());
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
        <Container>
            <H4>산모님 성함</H4>
            <InputField
                type="text"
                placeholder="산모님 이름을 입력하세요"
                onChange={handleNameChange}
                onKeyDown={handleEnterPress}
            />
        </Container>

    </div>
  );
};

export default CustomerContract;