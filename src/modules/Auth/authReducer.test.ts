import { authReducer, initAuthState, setUserGender, setUserName, setUser, logout } from "./authReducer";
import { Gender } from "@/modules/Game";

describe("Auth reducer", () => {
	it("initial gender should be robot", () => {
		expect(initAuthState.userGender).toBe(Gender.robot);
	});

	it("setUserGender should change gender", () => {
		const authState = authReducer(initAuthState, setUserGender(Gender.female));

		expect(authState.userGender).toBe(Gender.female);
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
			const authState = authReducer(initAuthState, setUser({ gender: Gender.male }));

			expect(authState.user).toBeNull();
		});

		it("should not change user if gender is not set", () => {
			const authState = authReducer(initAuthState, setUser({ name: "test" }));

			expect(authState.user).toBeNull();
		});

		it("should change user if payload is correct", () => {
			const authState = authReducer(initAuthState, setUser({ name: "test", gender: Gender.male }));

			expect(authState.user?.name).toBe("test");
			expect(authState.user?.gender).toBe(Gender.male);
		});

	});

	it("logout should clear user and user name and set gender to default", () => {
		const authState = authReducer(initAuthState, setUserName("test"));
		const nextState = authReducer(authState, setUserGender(Gender.male));
		const state = authReducer(nextState, setUser({ name: "test", gender: Gender.male }));

		const finalState = authReducer(state, logout());

		expect(finalState.user).toBeNull();
		expect(finalState.userGender).toBe(Gender.robot);
		expect(finalState.userName).toBe("");
	})
});