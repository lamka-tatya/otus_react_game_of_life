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
  background-color: #cccccc;
  border-right: 2px solid #c3c3c3;
  border-bottom: 2px solid #c3c3c3;
  border-radius: 0 0 20px 0;
  box-shadow: 0px 0px 10px 18px #f1f1f1;
`;

export const RightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ece8e8;
  width: 80px;
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BottomContainer = styled.div`
  display: flex;
  height: 80px;
  background-color: #ece8e8;
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
