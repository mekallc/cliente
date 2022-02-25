import { createReducer, on } from '@ngrx/store';
import * as serviceActions from '../actions/service.actions';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export interface ServiceState { service: ServiceModel[]; loading: boolean; error: any; total: number }
export const serviceState: ServiceState = { loading: false, service: [], error: null, total: 0 };

const serviceReducerMap = createReducer(
  serviceState,
  on(serviceActions.loadService, (state, { status }) => ({
    ...state, loading: true, status })),

  on(serviceActions.successService, (state, { service }) => ({
    ...state, loading: false, service, total: service.length })),

  on(serviceActions.errorService, (state, { error }) => ({
  ...state, loading: false, error })),
);

export const serviceReducer = (state: any, action: any) => serviceReducerMap(state, action);
