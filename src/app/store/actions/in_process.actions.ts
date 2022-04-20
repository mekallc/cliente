import { createAction, props } from '@ngrx/store';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export const loadInProcess = createAction( '[IN PROCESS] Load'  );

export const successInProcess = createAction(
  '[IN PROCESS] Success', props<{ inProcess: ServiceModel[]}>()
);

export const addInProcess = createAction(
  '[IN PROCESS] Add ', props<{ item: any}>()
);

export const deleteInProcess = createAction(
  '[IN PROCESS] Delete ', props<{ id: any}>()
);

export const errorInProcess = createAction(
  '[IN PROCESS] Error', props<{ error: any }>()
);
