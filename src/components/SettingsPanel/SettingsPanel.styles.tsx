import styled from "@emotion/styled";
import { Formik, Form, Field } from "formik";

export const FlexContainer = styled.div`
  display: flex;
`;

export const OverlayChildrenStyled = styled(FlexContainer)`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const OverlayStyled = styled(OverlayChildrenStyled)`
  z-index: 10;
  background: grey;
  opacity: 0.5;
`;

export const FormStyled = styled(Form)`
  z-index: 10;
  background: white;
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 0 1rem;
  font-family: MONOSPACE;
  font-size: 1.5rem;
  box-shadow: 3px 3px 4px 2px #0e0e0e61;
`;

export const FieldStyled = styled(Field)`
  font-family: inherit;
  font-size: inherit;
  height: 2rem;
  width: 4rem;
  padding: 5px;
  margin-left: 5px;
`;

export const FieldsetStyled = styled.fieldset`
  margin: 1rem 0;
  border-radius: 5px;
`;

export const FieldsContainer = styled(FlexContainer)`
  justify-content: space-between;
`;

export const FieldContainer = styled(FlexContainer)`
  align-items: center;
  padding: 0.5rem;
`;

export const ImageStyled = styled.img`
  height: 2rem;
`;

export const LabelStyled = styled.label`
  display: contents;
  width: 70px;
`;

export const InputStyled = styled.input`
  width: 50px;
`;

export const ButtonsContainer = styled(FlexContainer)`
  justify-content: flex-end;
`;
