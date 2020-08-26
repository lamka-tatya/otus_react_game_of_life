import styled from "@emotion/styled";

export const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const FieldContainer = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #ffffff;
  background: linear-gradient( #ffffff,#b6d8ef70 1px),linear-gradient( 90deg,#ffffff,#b6d8efde 1px);
  background-size: 10px 10px;
  background-position: center center;
  border-right: 2px solid #f3f1f1;
  border-bottom: 2px solid #f3f1f1;
  border-radius: 0 0 20px 0;
  box-shadow: 4px 4px 14px 12px #f1f1f1;
`;

export const RightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #dedddd;
  width: 80px;
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BottomContainer = styled.div`
  display: flex;
  height: 80px;
  background-color: #dedddd;
  justify-content: space-between;
  align-items: center;
  font-family: MONOSPACE;
  font-size: 1.5rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const ImageStyled = styled.img`
  height: 60px;
  margin-bottom: 20px;
`;
