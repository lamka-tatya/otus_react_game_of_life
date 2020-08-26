import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/modules/Game";
import { Gender } from "../Game/Gender";

export interface AuthState {
	userName: string;
	userGender: Gender;
	user: User | null;
}

export const initAuthState: AuthState = {
	userName: "",
	userGender: Gender.robot,
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
		getStoredUser(_) { },
		logout(state) {
			state.userName = "";
			state.userGender = Gender.robot;
			state.user = null;
		 },
	}
});

export const {
	setUserName,
	setUserGender,
	setUser,
	getStoredUser,
	logout,
} = authSlice.actions;
export const authReducer = authSlice.reducer;