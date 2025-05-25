import { useState } from "react";
import styled from "@emotion/styled";
import FormContainer from "../FormContainer/FormContainer";
import useSupabase from "../hooks/useSupabase";
import { areaOptions, voucherOptions } from "../functions/PriceInfo";
import { dateOptions } from "../functions/PriceInfo";

const PriceMainContent = (props) => {
    // States will be updated from user form
    const [customerName, setCustomerName] = useState('');
    const [type, setType] = useState('');
    const [days, setDays] = useState('');
    const [area, setArea] = useState('');
    const [duration, setDuration] = useState('');
    

    // Show message when data fetching for db is complete
    const [showMsg, setShowMsg] = useState(false);
    // Message state
    const [msg, setMsg] = useState('');
    // useSupabase custom hook
    const { fetchVoucherData, fetchBankData } = useSupabase();

    const weeksCaculator = (day) => {
        if (day > 5) return Math.floor(day / 5);
        else return 1;
    }

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setType(selectedType);

        const selectedOption = voucherOptions
            .flatMap(group => group.options)
            .find(option => option.value === selectedType);

        setDuration(selectedOption?.duration || '');
    };

    const handleDaysChange = (e) => {
        setDays(e.target.value);
    };

    const handleAreaChange = (e) => {
        setArea(e.target.value);
    };

    const handleNameChange = (e) => {
        setCustomerName(e.target.value);
    };

    const handleCreateMsgButton = async () => {
        // If the user has not selected anything yet, don't fetch
        if (!type || !days || !customerName || !area) return;

        try {
            const [voucherResponse, areaResponse] = await Promise.all([
                fetchVoucherData(type, days),
                fetchBankData(area)
            ]);

            if (!voucherResponse.data || !areaResponse.data) {
                alert('서버에서 가격 정보를 가져오는데 실패했어요. 관리자에게 문의하세요.');
                return;
            }
            console.log(voucherResponse, areaResponse);
                // Build the message if data was successfully fetched
            const completedMsg = props.preText
                .replace('{name}', customerName)
                .replace('{type}', type)
                .replace('{days}', days)
                .replace('{weeks}', weeksCaculator(days))
                .replace('{fullPrice}', voucherResponse.data[0].fullPrice)
                .replace('{grant}', voucherResponse.data[0].grant)
                .replace('{actualPrice}', voucherResponse.data[0].actualPrice)
                .replace('{accNum}', areaResponse.data[0].accNum)
                .replace('{bankName}', areaResponse.data[0].bankName)
                .replace('{area}', area)
            setMsg(completedMsg);
            setShowMsg(true);
        } catch (error) {
            console.error("Error in handleCreateMsgButton", error);
            alert('메시지 생성에 실패했어요. 관리자에게 문의하세요.');
        }
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && msg) {
            setShowMsg(true);
        }
    }

    return (
        <Container>
            <Title>{props.title}</Title>
            <Description>{props.desc}</Description>

            <H4>산모님 성함</H4>
            <InputField
                type="text"
                placeholder="산모님 이름을 입력하세요"
                onChange={handleNameChange}
                onKeyDown={handleEnterPress}
            />

            <H4>바우처 유형</H4>
            <SelectBox value={type} onChange={handleTypeChange}>
                <Option value="" disabled>
                    선택하세요
                </Option>
                {voucherOptions.map((group) => (
                    <OptionGroup key={group.group} label={group.group}>
                        {group.options.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </OptionGroup>
                ))}
            </SelectBox>

            <H4>서비스 기간</H4>
            <SelectBox value={days} onChange={handleDaysChange}>
                <Option value="" disabled>
                    선택하세요
                </Option>

                {type !== "" && (
                    duration === 'short' ? (
                        dateOptions[0].options.map((date) => (
                            <Option key={date.value} value={date.value}>
                                {date.value}
                            </Option>
                        ))
                    ) : duration === 'long' ? (
                        dateOptions[2].options.map((date) => (
                            <Option key={date.value} value={date.value}>
                                {date.value}
                            </Option>
                        ))
                    ) : (
                        dateOptions[1].options.map((date) => (
                            <Option key={date.value} value={date.value}>
                                {date.value}
                            </Option>
                        ))
                    )
                )}
            </SelectBox>

            <H4>지역 선택</H4>
            <SelectBox value={area} onChange={handleAreaChange}>
                <Option value="" disabled>
                    선택하세요
                </Option>

                {type !== "" && days !== "" && areaOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
            </SelectBox>

            <CreateMsgButton
                onClick={handleCreateMsgButton}
                disabled={!type || !days || !customerName || !area}
            >
                메시지 생성
            </CreateMsgButton>

            {showMsg && (
                <FormContainerWrapper $isGrayedOut={!type || !days || !area}>
                    <FormContainer msg={msg} />
                </FormContainerWrapper>
            )}
        </Container>
    );
};

const FormContainerWrapper = styled.div`
    opacity: ${(props) => (props.$isGrayedOut ? 0.5 : 1)};
    filter: ${(props) => (props.$isGrayedOut ? "grayscale(100%)" : "none")};
    pointer-events: ${(props) => (props.$isGrayedOut ? "none" : "auto")};
`

// Styled components
const Container = styled.div`
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
`;

const Title = styled.h1`
    color: #007bff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    color: #6c757d;
    margin-bottom: 2rem;
`;

const InputField = styled.input`
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

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

const Option = styled.option`
  padding: 0.5rem;
`;

const OptionGroup = styled.optgroup`
  font-weight: bold;
  color: #6c757d;
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

export default PriceMainContent;