import { createAction, props } from '@ngrx/store';

export const cancelledLoad = createAction('[CANCELLED] Load');

export const cancelledLoaded = createAction(
  '[CANCELLED] Loaded', props<{ cancelled: any}>()
);

export const cancelledError = createAction(
  '[CANCELLED] Error', props<{ error: any }>()
);
