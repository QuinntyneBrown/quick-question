import { Action } from "@ngrx/store";
import { POLL_ADD_SUCCESS, POLL_GET_SUCCESS, POLL_REMOVE_SUCCESS } from "../constants";
import { initialState } from "./initial-state";
import { AppState } from "./app-state";
import { Poll } from "../models";
import { addOrUpdate, pluckOut } from "../utilities";

export const pollsReducer = (state: AppState = initialState, action: Action) => {
    switch (action.type) {
        case POLL_ADD_SUCCESS:
            var entities: Array<Poll> = state.polls;
            var entity: Poll = action.payload;
            addOrUpdate({ items: entities, item: entity});            
            return Object.assign({}, state, { polls: entities });

        case POLL_GET_SUCCESS:
            var entities: Array<Poll> = state.polls;
            var newOrExistingPolls: Array<Poll> = action.payload;
            for (let i = 0; i < newOrExistingPolls.length; i++) {
                addOrUpdate({ items: entities, item: newOrExistingPolls[i] });
            }                                    
            return Object.assign({}, state, { polls: entities });

        case POLL_REMOVE_SUCCESS:
            var entities: Array<Poll> = state.polls;
            var id = action.payload;
            pluckOut({ value: id, items: entities });
            return Object.assign({}, state, { polls: entities });

        default:
            return state;
    }
}

