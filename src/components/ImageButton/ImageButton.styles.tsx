import styled from "@emotion/styled";

export const ImageStyled = styled.img<{ disabled: boolean }>`
  height: 2rem;
  opacity: ${(p) => (p.disabled ? 0.4 : 1)};
`;

export const ButtonStyled = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  height: fit-content;
  width: fit-content;
  padding: 0.5rem;
`;
