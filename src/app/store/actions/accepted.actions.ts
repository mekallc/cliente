import { createAction, props } from '@ngrx/store';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export const loadAccepted = createAction( '[ACCEPTED] Load' );

export const successAccepted = createAction( '[ACCEPTED] Success', props<{ accepted: ServiceModel[]}>() );

export const errorAccepted = createAction( '[ACCEPTED] Error', props<{ error: any }>() );

export const addAccepted = createAction(
  '[ACCEPTED] Add ', props<{ item: any}>()
);

export const deleteAccepted = createAction(
  '[ACCEPTED] Delete ', props<{ id: any}>()
);
