import { createAction, props } from '@ngrx/store';

export const finishedLoad = createAction('[FINISHED] Load');

export const finishedLoaded = createAction(
  '[FINISHED] Loaded', props<{ finished: any}>()
);

export const finishedError = createAction(
  '[FINISHED] Error', props<{ error: any }>()
);
