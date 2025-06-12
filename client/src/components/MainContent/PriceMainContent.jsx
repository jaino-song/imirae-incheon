import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import FormContainer from "../FormContainer/FormContainer";
import useSupabase from "../hooks/useSupabase";
import { areaOptions, voucherOptions } from "../functions/PriceInfo";
import { dateOptions } from "../functions/PriceInfo";
import useContractStore from "../../store/customerStore";
import LinkButton from "../Buttons/LinkButton";

const PriceMainContent = (props) => {
    // Get state and actions from the store
    const {
        customerName,
        type,
        days,
        area,
        duration,
        setCustomerName,
        setType,
        setDays,
        setArea,
        setDuration
    } = useContractStore();
    
    // Show message when data fetching for db is complete
    const [showMsg, setShowMsg] = useState(false);
    const [isGrayedOut, setIsGrayedOut] = useState(false);
    // Message state
    const [msg, setMsg] = useState('');
    // useSupabase custom hook
    const { fetchVoucherData, fetchBankData } = useSupabase();

    const weeksCalculator = (day) => {
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
        if (!type || !days || !customerName || !area) return;

        setIsGrayedOut(false);

        try {
            const [voucherResponse, areaResponse] = await Promise.all([
                fetchVoucherData(type, days),
                fetchBankData(area)
            ]);

            if (!voucherResponse.data || !areaResponse.data) {
                alert('서버에서 가격 정보를 가져오는데 실패했어요. 관리자에게 문의하세요.');
                return;
            }

            console.log('1',useContractStore.getState().fullPrice);
            // Update price data in store
            useContractStore.getState().setPriceData({
                fullPrice: voucherResponse.data[0].fullPrice,
                grant: voucherResponse.data[0].grant,
                actualPrice: voucherResponse.data[0].actualPrice,
                accNum: areaResponse.data[0].accNum,
                bankName: areaResponse.data[0].bankName
            });
            console.log('2',useContractStore.getState().fullPrice);

            // Build the message
            const completedMsg = props.preText
                .replace('{name}', customerName)
                .replace('{type}', type)
                .replace('{days}', days)
                .replace('{weeks}', weeksCalculator(days))
                .replace('{fullPrice}', useContractStore.getState().fullPrice)
                .replace('{grant}', useContractStore.getState().grant)
                .replace('{actualPrice}', useContractStore.getState().actualPrice)
                .replace('{accNum}', useContractStore.getState().accNum)
                .replace('{bankName}', useContractStore.getState().bankName)
                .replace('{area}', area);
            
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

    useEffect(() => {
        setIsGrayedOut(true);
    }, [type, days, area]);

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
                value={customerName}
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
            {showMsg && ( <FormContainer msg={msg} isGrayedOut={isGrayedOut} /> )}
            {showMsg && (
            <LinkButton 
                routeLink="/contract" 
                TextStyle={H3} 
                BtnStyle={ContractNavBtn}
                disabled={!type || !days || !customerName || !area}
            >
                계약서 생성
            </LinkButton>
            )}
        </Container>
    );
};

// Styled components
const Container = styled.div`
    padding: 2rem;
    max-width: 900px;
    margin: 5% auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 30px;
    height: 70%;

    @media (max-width: 1200px) {
        max-width: 900px;
        width: 80%;
    }

    @media (max-width: 768px) {
        max-width: 700px;
        width: 80%;
    }
    
    @media (max-width: 480px) {
        max-width: 500px;
        width: 80%;
    }
`;

const Title = styled.h1`
    color: #007bff;
    font-size: 2.5rem;
    margin: 0;
    
    @media (min-width: 1200px) {
            margin-top: 2rem;
        }

    @media (max-width: 1200px) {
        font-size: 2rem;
    }
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
    width: 50vw;
    min-width: 150px;
    box-sizing: border-box;
`;

const SelectBox = styled.select`
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    font-size: 1rem;
    width: 50vw;
    margin-bottom: 1rem;
    min-width: 150px;
    box-sizing: border-box;

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
    margin: 2rem;
    width: 50vw;
    min-width: 150px;
    padding: 1rem 2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
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
    margin: 0.5rem;
`

const ContractNavBtn = styled.button`
    margin: 2rem;
    width: 50vw;
    height: 5vh;
    min-width: 150px;
    padding: 1rem 2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
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
`

const H3 = styled.h3`
    display: block;
    font-size: 1rem;
    font-weight: bold;
`

export default PriceMainContent;