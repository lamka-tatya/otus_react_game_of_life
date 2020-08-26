import { authReducer, initAuthState, setUserGender, setUserName, setUser, logout } from "./authReducer";

describe("Auth reducer", () => {
	it("initial gender should be robot", () => {
		expect(initAuthState.userGender).toBe("robot");
	});

	it("setUserGender should change gender", () => {
		const authState = authReducer(initAuthState, setUserGender("female"));

		expect(authState.userGender).toBe("female");
	});

	it("setUserName should change name", () => {
		const authState = authReducer(initAuthState, setUserName("test"));

		expect(authState.userName).toBe("test");
	});

	describe("setUser", () => {
		it("should not change user if payload is null", () => {
			const authState = authReducer(initAuthState, setUser(null));

			expect(authState.user).toBeNull();
		});

		it("should not change user if name is not set", () => {
			const authState = authReducer(initAuthState, setUser({ gender: "male" }));

			expect(authState.user).toBeNull();
		});

		it("should not change user if gender is not set", () => {
			const authState = authReducer(initAuthState, setUser({ name: "test" }));

			expect(authState.user).toBeNull();
		});

		it("should change user if payload is correct", () => {
			const authState = authReducer(initAuthState, setUser({ name: "test", gender: "male" }));

			expect(authState.user?.name).toBe("test");
			expect(authState.user?.gender).toBe("male");
		});

	});

	it("logout should clear user and user name and set gender to default", () => {
		const authState = authReducer(initAuthState, setUserName("test"));
		const nextState = authReducer(authState, setUserGender("male"));
		const state = authReducer(nextState, setUser({ name: "test", gender: "male" }));

		const finalState = authReducer(state, logout());

		expect(finalState.user).toBeNull();
		expect(finalState.userGender).toBe("robot");
		expect(finalState.userName).toBe("");
	})
});