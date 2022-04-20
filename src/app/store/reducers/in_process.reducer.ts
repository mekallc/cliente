import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/in_process.actions';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export interface InProcessState { inProcess: ServiceModel[]; loading: boolean; total: number; error: any  };
export const inProcessState: InProcessState = { loading: false, inProcess: [], total: 0, error: null };

const inProcessReducerMap = createReducer(
  inProcessState,

  on(actions.loadInProcess, (state) => ({ ...state, loading: true })),

  on(actions.successInProcess, (state, { inProcess }) => ({ ...state, loading: false, inProcess, total: inProcess.length })),

  on(actions.addInProcess, (state, { item }) => ({
    ...state,
    loading: false,
    inProcess: state.inProcess.concat(...item)
  })),
  on(actions.deleteInProcess, (state, { id }) => ({
    ...state,
    loading: false,
    inProcess: state.inProcess.filter(i => i.id !== id)
  })),

  on(actions.errorInProcess, (state, { error }) => ({ ...state, loading: false, error })),
);

export const inProcessReducer = (state: any, action: any) => inProcessReducerMap(state, action);
