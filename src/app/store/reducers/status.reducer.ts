import { statusLoad } from '../actions/status.actions';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';


export interface StatusState { status: string }
export const statusState: StatusState = { status: '' };

const statusReducerMap = createReducer(
  statusState,
  on(actions.statusLoad, (state) => ({...state })),
  on(actions.statusLoaded, (state, { status }) => ({...state, status })),
  on(actions.statusChanged, (state, { status }) => ({...state, status })),
  on(actions.statusDelete, (state) => ({...state, status: '' })),

);

export const statusReducer = (state: any, action: any) => statusReducerMap(state, action);
