import { createAction, props } from '@ngrx/store';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export const loadInProcess = createAction( '[IN PROCESS] Load'  );

export const successInProcess = createAction(
  '[IN PROCESS] Loaded Success', props<{ inProcess: ServiceModel[]}>()
);

export const errorInProcess = createAction(
  '[IN PROCESS] Loaded Error', props<{ error: any }>()
);
