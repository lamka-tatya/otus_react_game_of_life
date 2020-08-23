import { User } from "@/modules/Game";
import { localStorageAuth } from "./authService";

describe("When user is logged in", () => {
  beforeEach(() => {
    const user: User = { name: "qwe", gender: "female" };
    localStorageAuth.login(user);
  });

  it("should set user settings to localStorage", () => {
    expect(localStorage.getItem(localStorageAuth.userNameKey)).toBe("qwe");
    expect(localStorage.getItem(localStorageAuth.userGenderKey)).toBe("female");
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
