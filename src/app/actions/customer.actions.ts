import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { CustomerService } from "../services";
import { AppState, AppStore } from "../store";
import { CUSTOMER_ADD_SUCCESS, CUSTOMER_GET_SUCCESS, CUSTOMER_REMOVE_SUCCESS } from "../constants";
import { Customer } from "../models";
import { Observable } from "rxjs";
import { guid } from "../utilities";

@Injectable()
export class CustomerActions {
    constructor(private _customerService: CustomerService, private _store: AppStore) { }

    public add(customer: Customer) {
        const newGuid = guid();
        this._customerService.add(customer)
            .subscribe(customer => {
                this._store.dispatch({
                    type: CUSTOMER_ADD_SUCCESS,
                    payload: customer
                },newGuid);                
            });
        return newGuid;
    }

    public get() {                          
        return this._customerService.get()
            .subscribe(customers => {
                this._store.dispatch({
                    type: CUSTOMER_GET_SUCCESS,
                    payload: customers
                });
                return true;
            });
    }

    public remove(options: {id: number}) {
        return this._customerService.remove({ id: options.id })
            .subscribe(customer => {
                this._store.dispatch({
                    type: CUSTOMER_REMOVE_SUCCESS,
                    payload: options.id
                });
                return true;
            });
    }

    public getById(options: { id: number }) {
        return this._customerService.getById({ id: options.id })
            .subscribe(customer => {
                this._store.dispatch({
                    type: CUSTOMER_GET_SUCCESS,
                    payload: [customer]
                });
                return true;
            });
    }
}
