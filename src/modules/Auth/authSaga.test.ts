import { authSaga, createAvatar } from "./authSaga";
import { rootReducer, initialAppState } from "@/store";
import { expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { setUser, getStoredUser } from "./authReducer";
import { localStorageAuth } from "./authService";

describe("Auth saga", () => {
	let saga: any;

	beforeEach(() => {
		localStorage.clear();
		saga = expectSaga(authSaga).withReducer(
			rootReducer,
			initialAppState
		);
	});

	it("should set userpic on setUser", async () => {
		const result = await saga
			.provide([[call(createAvatar, "robot", "test"), "test svg stub"]])
			.dispatch(setUser({ name: "test", gender: "robot" }))
			.run();

		expect(result.storeState.game.userpic).toBe("test svg stub");
	});

	it("should not set userpic on setUser if name is not set", async () => {
		const result = await saga
			.provide([[call(createAvatar, "robot", ""), "test svg stub"]])
			.dispatch(setUser({ name: "", gender: "robot" }))
			.run();

		expect(result.storeState.game.userpic).toBe("");
	});

	it("create avatar for empty gender should return empty", async () => {
		const result = createAvatar("", "name");

		expect(result).toBe("");
	});

	it("should set user name and gender to local storage on setUser", async () => {
		const result = await saga
			.dispatch(setUser({ name: "test", gender: "female" }))
			.run();

		expect(localStorage.getItem(localStorageAuth.userNameKey)).toBe("test");
		expect(localStorage.getItem(localStorageAuth.userGenderKey)).toBe("female");
	});

	it("should set user name and gender to state form localstorage on getUser", async () => {
		localStorage.setItem(localStorageAuth.userNameKey, "userName");
		localStorage.setItem(localStorageAuth.userGenderKey, "male");

		const result = await saga
			.dispatch(getStoredUser())
			.run();

		expect(result.storeState.auth.userName).toBe("userName");
		expect(result.storeState.auth.userGender).toBe("male");
	});

	it("should not set user name and gender to state form localstorage on getUser if name is empty", async () => {
		localStorage.setItem(localStorageAuth.userNameKey, "");
		localStorage.setItem(localStorageAuth.userGenderKey, "male");

		const result = await saga
			.dispatch(getStoredUser())
			.run();

		expect(result.storeState.auth.userName).toBe("");
		expect(result.storeState.auth.userGender).toBe("robot");
	});
});