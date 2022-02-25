import { createReducer, on } from '@ngrx/store';
import * as historyActions from '../actions/history.actions';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export interface HistoryState { history: ServiceModel[]; loading: boolean; error: any; total: number }
export const historyState: HistoryState = { loading: false, history: [], error: null, total: 0 };

const historyReducerMap = createReducer(
  historyState,
  on(historyActions.loadHistory, (state) => ({
    ...state, loading: true })),

  on(historyActions.successHistory, (state, { history }) => ({
    ...state, loading: false, history, total: history.length })),

  on(historyActions.errorHistory, (state, { error }) => ({
  ...state, loading: false, error })),
);

export const historyReducer = (state: any, action: any) => historyReducerMap(state, action);
