import React, { FC, useCallback } from "react";
import {
  FormStyled,
  NameContainer,
  FieldStyled,
  GenderContainer,
} from "./Auth.styles";
import GameImg from "./assets/game.svg";
import { ImageButton } from "@/components/ImageButton";
import { Gender } from "@/modules/Game";

export const Auth: FC<{ userName?: string; userGender?: Gender }> = ({
  userName,
  userGender,
}) => {
  const onSubmit = useCallback(() => {}, []);
  const onChangeName = useCallback(() => {}, []);
  const onChangeGender = useCallback(() => {}, []);

  return (
    <FormStyled name="authForm" onSubmit={onSubmit}>
      <NameContainer>
        <label>Привет, </label>
        <FieldStyled
          type="text"
          name="userName"
          value={userName}
          onChange={onChangeName}
        />
      </NameContainer>
      <GenderContainer>
        <input
          type="radio"
          checked={userGender === "male"}
          value="male"
          name="gender"
          onChange={onChangeGender}
        />{" "}
        М
        <input
          type="radio"
          checked={userGender === "female"}
          value="female"
          name="gender"
          onChange={onChangeGender}
        />{" "}
        Ж
        <input
          type="radio"
          checked={userGender === "robot"}
          value="robot"
          name="gender"
          onChange={onChangeGender}
        />{" "}
        Нет
      </GenderContainer>
      <ImageButton
        title="Let's play!"
        type="submit"
        src={GameImg}
      ></ImageButton>
    </FormStyled>
  );
};
