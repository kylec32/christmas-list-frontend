import { Action } from '@ngrx/store';

export const LOAD_OTHER_PRESENTS = "LOAD_OTHER_PRESENTS";
export const SET_AS_PURCHASED = "SET_AS_PURCHASED";
export const UNSET_AS_PURCHASED = "UNSET_AS_PURCHASED";

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export function presents(state = [], action: ActionWithPayload<any>) {
    switch (action.type) {
        case LOAD_OTHER_PRESENTS:
            return action.payload;
        case SET_AS_PURCHASED:
            return state.map((item) => {
                item.presents = item.presents.map((present) => {
                                                    present.purchasedByMe = present.presentId == action.payload ? true : present.purchasedByMe;
                                                    present.purchased = present.presentId == action.payload ? true : present.purchased;
                                                    return present;
                });	
            
                return item;
            });
        case UNSET_AS_PURCHASED:
            return state.map((item) => {
                item.presents = item.presents.map((present) => {
                                                    present.purchasedByMe = present.presentId == action.payload ? false : present.purchasedByMe;
                                                    present.purchased = present.presentId == action.payload ? false : present.purchased;
                                                    return present;
                });	
            
                return item;
            });
        default:
            return state;
    }
}