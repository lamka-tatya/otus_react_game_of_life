import React, { FC, useCallback, ChangeEvent, useEffect } from "react";
import {
  FormStyled,
  NameContainer,
  FieldStyled,
  GenderContainer,
} from "./Auth.styles";
import GameImg from "./assets/game.svg";
import { ImageButton } from "@/components/ImageButton";
import { Gender } from "@/modules/Game";
import { AppState } from "@/store";
import {
  setUserName,
  setUserGender,
  setUser,
  getStoredUser,
} from "./authReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state: AppState) => ({
  userName: state.auth.userName,
  userGender: state.auth.userGender,
  user: state.auth.user,
});
const mapDispatchToProps = {
  setUserName,
  setUserGender,
  setUser,
  getStoredUser,
};

type AuthProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const AuthInternal: FC<AuthProps> = ({
  userName,
  userGender,
  user,
  setUserName,
  setUserGender,
  setUser,
  getStoredUser,
}) => {
  const onSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      setUser({ name: userName, gender: userGender });
    },
    [userName, userGender, setUser]
  );
  const onChangeName = useCallback(
    (e: ChangeEvent) => {
      setUserName((e.target as any).value);
    },
    [setUserName]
  );
  const onChangeGender = useCallback(
    (e: ChangeEvent) => {
      const rawGender = (e.target as any).value;
      setUserGender(Gender[rawGender as keyof typeof Gender]);
    },
    [setUserGender]
  );

  useEffect(() => {
    getStoredUser();
  }, [getStoredUser]);

  return user ? (
    <Redirect to="/game" push={true} />
  ) : (
    <FormStyled name="authForm" onSubmit={onSubmit}>
      <NameContainer>
        <label key="hello">Привет, </label>
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
          checked={userGender === Gender.male}
          value="male"
          name="gender"
          onChange={onChangeGender}
        />{" "}
        М
        <input
          type="radio"
          checked={userGender === Gender.female}
          value="female"
          name="gender"
          onChange={onChangeGender}
        />{" "}
        Ж
        <input
          type="radio"
          checked={userGender === Gender.robot}
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

export const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthInternal);
