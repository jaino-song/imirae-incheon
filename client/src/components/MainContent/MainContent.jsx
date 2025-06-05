
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
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  @media (max-width: 1200px) {
    max-width: 900px;
    width: 90%;
  }

  @media (max-width: 768px) {
    max-width: 700px;
    width: 90%;
  }
  
  @media (max-width: 480px) {
    max-width: 500px;
    width: 90%;
  }
`;

const Title = styled.h1`
  color: #007bff;
  font-size: 2.5rem;
  margin: 0;

  @media (min-width: 1060px) {
    margin-top: 2rem;
  `;

const Description = styled.p`
  color: #6c757d;
  margin-bottom: 2rem;
`;

export default MainContent;