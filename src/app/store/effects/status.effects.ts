import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as actions from '@store/actions';

@Injectable()

export class StatusEffects {
  service$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.statusLoad),
      map(() => actions.statusLoaded({ status: 'OPEN' })),
      catchError(async ({ error }) => actions.errorAccepted({ error }))
    )
  );

  change$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.statusChanged),
      map((action) => actions.statusLoaded({ status: action.status })),
      catchError(async ({ error }) => actions.errorAccepted({ error }))
    )
  );

  constructor(
    private actions$: Actions,
  ) {}
}
