import { Poll } from "../models";

export interface AppState {
    polls: Array<Poll>;
	currentUser: any;
    isLoggedIn: boolean;
    token: string;
}
