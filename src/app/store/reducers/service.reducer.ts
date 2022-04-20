import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export interface ServiceState { service: ServiceModel[]; loading: boolean; error: any; total: number }
export const serviceState: ServiceState = { loading: false, service: [], error: null, total: 0 };

const serviceReducerMap = createReducer(
  serviceState,
  on(actions.loadService, (state, { status }) => ({
    ...state, loading: true, status })),

  on(actions.successService, (state, { service }) => ({
    ...state, loading: false, service, total: service.length })),

    on(actions.deleteInProcess, (state, { id }) => ({
      ...state,
      loading: false,
      inProcess: state.service.filter(i => i.id !== id)
    })),

  on(actions.errorService, (state, { error }) => ({
  ...state, loading: false, error })),
);

export const serviceReducer = (state: any, action: any) => serviceReducerMap(state, action);
