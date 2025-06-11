
import styled from "@emotion/styled";
import FormContainer from "../FormContainer/FormContainer";

const MainContent = (props) => {
    return (
        <Container>
            <Title>{props.title}</Title>
            <Description>{props.desc}</Description>

            <FormContainer msg={props.msg} />
        </Container>
    )
}

// Styled components
const Container = styled.div`
    padding: 2rem;
    max-width: 900px;
    margin: 2% auto;
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
    }`;

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

export default MainContent;