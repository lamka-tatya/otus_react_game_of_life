import styled from "@emotion/styled";

export const FieldStyled = styled.div<{ height: number; width: number }>`
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
  padding: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0px 0px 6px 0px #0e0e0e61;
  overflow: overlay;
  border-radius: 20px;
  background-color: #f7f7f7;;
`;

export const RowStyled = styled.div`
  display: flex;
  align-items: start;
`;
