
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

export default MainContent;