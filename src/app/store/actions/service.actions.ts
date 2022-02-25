import { createAction, props } from '@ngrx/store';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export const loadService = createAction(
  '[Service] Load',  props<{ status: string }>()
);

export const successService = createAction(
  '[Service] Loaded Success', props<{ service: ServiceModel[]}>()
);

export const errorService = createAction(
  '[Service] Loaded Error', props<{ error: any }>()
);
