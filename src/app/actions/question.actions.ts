import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { QuestionService } from "../services";
import { AppState, AppStore } from "../store";
import { QUESTION_ADD_SUCCESS, QUESTION_GET_SUCCESS, QUESTION_REMOVE_SUCCESS } from "../constants";
import { Question } from "../models";
import { Observable } from "rxjs";
import { guid } from "../utilities";

@Injectable()
export class QuestionActions {
    constructor(private _questionService: QuestionService, private _store: AppStore) { }

    public add(question: Question) {
        const newGuid = guid();
        this._questionService.add(question)
            .subscribe(question => {
                this._store.dispatch({
                    type: QUESTION_ADD_SUCCESS,
                    payload: question
                },newGuid);                
            });
        return newGuid;
    }

    public get() {                          
        return this._questionService.get()
            .subscribe(questions => {
                this._store.dispatch({
                    type: QUESTION_GET_SUCCESS,
                    payload: questions
                });
                return true;
            });
    }

    public remove(options: {id: number}) {
        return this._questionService.remove({ id: options.id })
            .subscribe(question => {
                this._store.dispatch({
                    type: QUESTION_REMOVE_SUCCESS,
                    payload: options.id
                });
                return true;
            });
    }

    public getById(options: { id: number }) {
        return this._questionService.getById({ id: options.id })
            .subscribe(question => {
                this._store.dispatch({
                    type: QUESTION_GET_SUCCESS,
                    payload: [question]
                });
                return true;
            });
    }
}
