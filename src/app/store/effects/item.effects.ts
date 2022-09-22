/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from '../actions';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';
import { UtilsService } from '@core/services/utils.service';
import { ChatService } from '@core/services/chat.service';

@Injectable()

export class ItemEffects {
  service$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemLoad),
      mergeMap((action: any) => this.db.getServiceActive(action.user)
        .pipe(
          map(item => actions.itemLoaded({ item })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemAdd),
      mergeMap((action: any) => this.db.setServices(action.item)
        .pipe(
          map((item) => actions.itemLoaded({ item })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemUpdate),
      mergeMap((action: any) => this.db.sendService(action.id, action.data)
        .pipe(
          map((item: any) => {
            this.chatService.joinRoom(`service-${item._id}`);
            return actions.itemLoaded({ item });
          }),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  changed$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.itemStatus),
    map((action) => actions.itemLoaded({ item: action.item }))
  )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemDelete),
      mergeMap((action: any) => this.db.cancelService(action.id)
        .pipe(
          map((item) => actions.itemLoaded({ item: null })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  closed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.itemClosed),
      mergeMap(({ id, data }) => this.db.sendService(id, data)
        .pipe(
          map(() => actions.itemLoaded({ item: null })),
          catchError(async ({ error }) => actions.itemError({ error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private uService: UtilsService,
    private db: DbCategoriesService,
    private chatService: ChatService,
  ) {}
}
