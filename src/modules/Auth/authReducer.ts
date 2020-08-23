import { createSlice } from "@reduxjs/toolkit";
import { Gender, User } from "@/modules/Game";

export interface AuthState {
	userName: string;
	userGender: Gender;
	user: User | null;
}

export const initAuthState: AuthState = {
	userName: "",
	userGender: "robot",
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initAuthState,
	reducers: {
		setUserName(state, action) {
			state.userName = action.payload;
		},
		setUserGender(state, action) {
			state.userGender = action.payload;
		},
		setUser(state, action) {
			if (action.payload) {
				const { name, gender } = action.payload;

				if (name && gender) {
					state.user = { name, gender };
				}
			}
		},
		getStoredUser(_) { }
	}
});

export const {
	setUserName,
	setUserGender,
	setUser,
	getStoredUser,
} = authSlice.actions;
export const authReducer = authSlice.reducer;