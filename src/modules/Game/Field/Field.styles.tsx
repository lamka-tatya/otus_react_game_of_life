import styled from "@emotion/styled";

export const FieldStyled = styled.div<{ height: number; width: number }>`
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
  padding: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 4px 2px #0e0e0e61;
  overflow: overlay;
  border-radius: 20px;
  background-color: white;
`;

export const RowStyled = styled.div`
  display: flex;
  align-items: start;
`;
