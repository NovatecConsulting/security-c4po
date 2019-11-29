import { createAction, props } from "@ngrx/store";

export const LOGIN = createAction('[Login] Login', props<{ username: string, password: string }>());
export const LOGIN_SUCCESS = createAction('[Login] Login Success', props<{ displayName: string }>());
export const LOGIN_ERROR = createAction('[Login] Login Error');
