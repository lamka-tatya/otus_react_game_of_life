import React, { FC } from "react";
import {
  FormStyled,
  ButtonsContainer,
  FieldContainer,
  LabelStyled,
  FieldStyled,
  FieldsContainer,
} from "./SettingsPanel.styles";
import { Formik } from "formik";
import CancelImg from "./assets/cancel_svg.svg";
import OkImg from "./assets/ok_svg.svg";
import { GameSettings } from ".";
import { XYSettingsSet } from "./XYSettingsSet";
import { ImageButton } from "@/components/ImageButton";
import { Overlay } from "./Overlay";

export const SettingsPanel: FC<{
  visible: boolean;
  settings: GameSettings;
  setSettings: (settings: GameSettings) => void;
  setIsSettingsVisible: (isVisible: boolean) => void;
}> = ({ visible, settings, setSettings, setIsSettingsVisible }) => {
  const onSubmitSettings = (settings: GameSettings) => {
    setSettings(settings);
    setIsSettingsVisible(false);
  };

  return visible ? (
    <Overlay>
      <Formik
        initialValues={settings}
        onSubmit={onSubmitSettings}
        key="settingsForm"
      >
        <FormStyled>
          <XYSettingsSet
            legend="Размер окна, px"
            ySettingName="height"
            xSettngName="width"
          />
          <XYSettingsSet
            legend="Количество клеток"
            ySettingName="rowCount"
            xSettngName="columnCount"
          />
          <FieldsContainer>
            <FieldContainer>
              <LabelStyled>Частота, х100 мсек</LabelStyled>
              <FieldStyled type="number" name="frequency" />
            </FieldContainer>
            <FieldContainer>
              <LabelStyled>max % заполненности</LabelStyled>
              <FieldStyled type="number" name="fillingPercent" />
            </FieldContainer>
          </FieldsContainer>

          <ButtonsContainer>
            <ImageButton
              type="button"
			  onClick={() => setIsSettingsVisible(false)}
			  key="closeBtn"
              src={CancelImg}
            ></ImageButton>
            <ImageButton
			  type="submit"
			  key="submitBtn"
              src={OkImg}
            ></ImageButton>
          </ButtonsContainer>
        </FormStyled>
      </Formik>
    </Overlay>
  ) : null;
};
