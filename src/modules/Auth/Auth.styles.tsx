import styled from "@emotion/styled";

export const FormStyled = styled.form`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-family: MONOSPACE;
  font-size: 1.5rem;
`;

export const NameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GenderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin-left: 2rem;
  }
`;

export const FieldStyled = styled.input`
  font-family: inherit;
  font-size: inherit;
  padding: 0 5px;
  margin-left: 1rem;
`;
