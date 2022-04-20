import { createAction, props } from '@ngrx/store';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export const loadHistory = createAction('[History] Load');

export const successHistory = createAction(
  '[History] Loaded Success', props<{ history: ServiceModel[]}>()
);

export const errorHistory = createAction(
  '[History] Loaded Error', props<{ error: any }>()
);
