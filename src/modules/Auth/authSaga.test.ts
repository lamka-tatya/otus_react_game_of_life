import { authSaga, createAvatar } from "./authSaga"
import { rootReducer, initialAppState } from "@/store"
import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"
import { setUser, getStoredUser, logout } from "./authReducer"
import localStorageAuth from "./authService"
import { Gender } from "@/modules/Game"
jest.mock('./authService')

describe("Auth saga", () => {

	let saga: any;
	beforeEach(() => {
		jest.resetAllMocks();

		saga = expectSaga(authSaga).withReducer(
			rootReducer,
			initialAppState
		);
	});

	it("should set userpic on setUser", async () => {
		const result = await saga
			.provide([[call(createAvatar, Gender.robot, "test"), "test svg stub"]])
			.dispatch(setUser({ name: "test", gender: Gender.robot }))
			.run();

		expect(result.storeState.game.userpic).toBe("test svg stub");
	});

	it("should not set userpic on setUser if name is not set", async () => {
		const result = await saga
			.provide([[call(createAvatar, Gender.robot, ""), "test svg stub"]])
			.dispatch(setUser({ name: "", gender: Gender.robot }))
			.run();

		expect(result.storeState.game.userpic).toBe("");
	});

	it("create avatar for empty gender should return empty", async () => {
		const result = createAvatar("", "name");

		expect(result).toBe("");
	});

	it("should set user name and gender to local storage on setUser", async () => {
		await saga
			.dispatch(setUser({ name: "test", gender: Gender.female }))
			.run();


		const loginMock = <jest.Mock>(localStorageAuth.login);
		expect(loginMock).toBeCalledWith({ name: "test", gender: Gender.female });
	});

	it("should set user name and gender to state form localStorageAuth on getUser", async () => {
		(localStorageAuth.getLoggedInUser as jest.Mock).mockImplementation(() => { return { name: "userName", gender: Gender.male } });

		const result = await saga
			.dispatch(getStoredUser())
			.run();

		expect(result.storeState.auth.userName).toBe("userName");
		expect(result.storeState.auth.userGender).toBe(Gender.male);
	});

	it("should not set user name and gender to state if there is not logged in user", async () => {
		(localStorageAuth.getLoggedInUser as jest.Mock).mockImplementation(() => { return undefined });

		const result = await saga
			.dispatch(getStoredUser())
			.run();

		expect(result.storeState.auth.userName).toBe("");
		expect(result.storeState.auth.userGender).toBe(Gender.robot);
	});

	it("should call authService.logout on logout", async () => {
		await saga
			.dispatch(setUser({ name: "test", gender: Gender.female }))
			.dispatch(logout())
			.run();

		const logoutMock = <jest.Mock>(localStorageAuth.logout);
		expect(logoutMock).toBeCalledTimes(1);
	});
});

// @ponicode
describe("authSaga.createAvatar", () => {
    test("0", () => {
        let callFunction: any = () => {
            authSaga.createAvatar(true, "Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            authSaga.createAvatar("Female", "Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            authSaga.createAvatar("Male", "George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            authSaga.createAvatar("Male", "Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            authSaga.createAvatar("Female", "Jean-Philippe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            authSaga.createAvatar(false, "")
        }
    
        expect(callFunction).not.toThrow()
    })
})
