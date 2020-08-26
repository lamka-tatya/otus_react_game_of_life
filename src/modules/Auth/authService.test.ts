import { User } from "@/modules/Game";
import localStorageAuth from "./authService";

describe("Auth service", () => {
	it("should not return stored user if name is empty in localStorage", () => {
		localStorage.setItem(localStorageAuth.userNameKey, "");
		localStorage.setItem(localStorageAuth.userGenderKey, "male");

		const result = localStorageAuth.getLoggedInUser();

		expect(result).toBeUndefined();
	});

	describe("When localStorage is empty", () => {
		beforeEach(() => {
			localStorage.clear();
		});

		it("should not set user to localStorage if name is not set", () => {
			localStorageAuth.login({ name: "", gender: "male" });

			expect(localStorage.getItem(localStorageAuth.userNameKey)).toBeNull();
			expect(localStorage.getItem(localStorageAuth.userGenderKey)).toBeNull();
		});

		it("should set user nmae and gender to localStorage if user is correct", () => {
			localStorageAuth.login({ name: "name", gender: "female" });

			expect(localStorage.getItem(localStorageAuth.userNameKey)).toBe("name");
			expect(localStorage.getItem(localStorageAuth.userGenderKey)).toBe("female");
		});
	});

	describe("When user is logged in", () => {
		beforeEach(() => {
			localStorage.clear();
			const user: User = { name: "qwe", gender: "female" };
			localStorageAuth.login(user);
		});

		it("should return this user as logged in", () => {
			const loggedUser = localStorageAuth.getLoggedInUser();

			expect(loggedUser?.name).toBe("qwe");
			expect(loggedUser?.gender).toBe("female");
		});

		describe("and then logout", () => {
			it("should clear user settings in localStorage", () => {
				localStorageAuth.logout();

				expect(localStorage.getItem(localStorageAuth.userNameKey)).toBeNull();
				expect(localStorage.getItem(localStorageAuth.userGenderKey)).toBeNull();
			});

			it("should return undefined as logged in user", () => {
				localStorageAuth.logout();

				const loggedUser = localStorageAuth.getLoggedInUser();

				expect(loggedUser).toBeUndefined();
			});
		});
	});

})
