import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/accepted.actions';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export interface AcceptedState { accepted: ServiceModel[]; loading: boolean; total: number; error: any  };
export const acceptedState: AcceptedState = { loading: false, accepted: [], total: 0, error: null };

const acceptedReducerMap = createReducer(
  acceptedState,
  on(actions.loadAccepted, (state) => ({ ...state, loading: true })),

  on(actions.successAccepted, (state, { accepted }) => ({ ...state, loading: false, accepted, total: accepted.length })),

  on(actions.errorAccepted, (state, { error }) => ({ ...state, loading: false, error })),

  on(actions.addAccepted, (state, { item }) => ({
    ...state,
    loading: false,
    accepted: state.accepted.concat(...item)
  })),
  on(actions.deleteAccepted, (state, { id }) => ({
    ...state,
    loading: false,
    accepted: state.accepted.filter(i => i.id !== id)
  })),
);

export const acceptedReducer = (state: any, action: any) => acceptedReducerMap(state, action);
