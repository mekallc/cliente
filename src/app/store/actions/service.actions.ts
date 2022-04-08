import { createAction, props } from '@ngrx/store';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export const loadService = createAction(
  '[OPENED] Load',  props<{ status: string }>()
);

export const successService = createAction(
  '[OPENED] Success', props<{ service: ServiceModel[]}>()
);

export const errorService = createAction(
  '[OPENED] Error', props<{ error: any }>()
);
