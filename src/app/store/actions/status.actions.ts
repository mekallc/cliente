import { createAction, props } from '@ngrx/store';

export const statusLoad    = createAction('[STATUS] Load');

export const statusLoaded    = createAction('[STATUS] Loaded', props<{ status: any }>());

export const statusDelete  = createAction( '[STATUS] Delete');

export const statusChanged = createAction( '[STATUS] Changed', props<{ status: any }>() );
