import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { PollService } from "../services";
import { AppState, AppStore } from "../store";
import { POLL_ADD_SUCCESS, POLL_GET_SUCCESS, POLL_REMOVE_SUCCESS } from "../constants";
import { Poll } from "../models";
import { Observable } from "rxjs";
import { guid } from "../utilities";

@Injectable()
export class PollActions {
    constructor(private _pollService: PollService, private _store: AppStore) { }

    public add(poll: Poll) {
        const newGuid = guid();
        this._pollService.add(poll)
            .subscribe(poll => {
                this._store.dispatch({
                    type: POLL_ADD_SUCCESS,
                    payload: poll
                },newGuid);                
            });
        return newGuid;
    }

    public get() {                          
        return this._pollService.get()
            .subscribe(polls => {
                this._store.dispatch({
                    type: POLL_GET_SUCCESS,
                    payload: polls
                });
                return true;
            });
    }

    public remove(options: {id: number}) {
        return this._pollService.remove({ id: options.id })
            .subscribe(poll => {
                this._store.dispatch({
                    type: POLL_REMOVE_SUCCESS,
                    payload: options.id
                });
                return true;
            });
    }

    public getById(options: { id: number }) {
        return this._pollService.getById({ id: options.id })
            .subscribe(poll => {
                this._store.dispatch({
                    type: POLL_GET_SUCCESS,
                    payload: [poll]
                });
                return true;
            });
    }
}
