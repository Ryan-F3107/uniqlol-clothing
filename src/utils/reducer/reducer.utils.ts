import { AnyAction } from "redux";

type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
}

export function withMatcher< AC extends () => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

export function withMatcher< AC extends (...args: any[]) => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}
export type ActionWithPayload<T, P> = {
    type: T,
    payload: P;
}

export type Action<T> = {
    type: T;
}
//ActionwithPayload data type expected to get back when we pass a type and payload with createAction
export function createAction<T extends string, P>(
    type: T, 
    payload: P
    ): ActionWithPayload<T, P>;

export function createAction<T extends string>(
    type: T, 
    payload: void
    ): Action<T>;//not expecting a payload, to overload we need to have same number of parameters

export function createAction<T extends string, P>(type: T, payload: P){
    return {type, payload };
}