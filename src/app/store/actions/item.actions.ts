import { createAction, props } from '@ngrx/store';

export const itemLoad = createAction('[ITEM] Load');

export const itemLoaded = createAction(
  '[ITEM] Loaded', props<{ item: any}>()
);

export const itemAdd = createAction(
  '[ITEM] Add', props<{ item: any}>()
);

export const itemUpdate = createAction(
  '[ITEM] Update', props<{ id: number; data: any }>()
);


export const itemDelete = createAction(
  '[ITEM] Delete', props<{ id: number}>()
);

export const itemStatus = createAction(
  '[ITEM] Changed', props<{ item: string}>()
);

export const itemError = createAction(
  '[ITEM] Error', props<{ error: any }>()
);
