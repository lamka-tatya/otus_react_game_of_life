import { takeEvery, put, call } from "redux-saga/effects";
import { setUser, setUserName, setUserGender, getStoredUser } from "./authReducer";
import { localStorageAuth as authService } from "./authService";
import { setUserpic } from "@/modules/Game";
import Avatars, { SpriteCollection } from "@dicebear/avatars";

import { default as spritesMale } from "@dicebear/avatars-male-sprites";
import { default as spritesFemale } from "@dicebear/avatars-female-sprites";
import { default as spritesBottts } from "@dicebear/avatars-bottts-sprites";

function* getUser() {
	const user = authService.getLoggedInUser();

	if (user) {
		yield put(setUserName(user.name));
		yield put(setUserGender(user.gender));
	}
}

export function createAvatar(gender: any, name: string) {
	const spriteHandler: any = {
		robot: spritesBottts,
		male: spritesMale,
		female: spritesFemale,
	};

	const sprite: SpriteCollection | undefined =
		spriteHandler[gender] ?? undefined;

	return sprite ? new Avatars(sprite, { base64: true }).create(name) : "";
}

function* login({ payload }: ReturnType<typeof setUser>) {
	const gender = payload?.gender;
	const name = payload?.name;

	const userPicSvg = name ? yield call(createAvatar, gender, name) : "";

	yield put(setUserpic(userPicSvg));

	authService.login(payload);
}

export function* authSaga() {
	yield takeEvery(getStoredUser.type, getUser);
	yield takeEvery(setUser.type, login);
}