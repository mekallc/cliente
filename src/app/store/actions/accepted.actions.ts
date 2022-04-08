import { createAction, props } from '@ngrx/store';
import { ServiceModel } from '@core/model/solicitud.interfaces';

export const loadAccepted = createAction( '[ACCEPTED] Load' );

export const successAccepted = createAction( '[ACCEPTED] Success', props<{ accepted: ServiceModel[]}>() );

export const errorAccepted = createAction( '[ACCEPTED] Error', props<{ error: any }>() );
