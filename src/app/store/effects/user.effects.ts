import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as userActions from '@store/actions/user.actions';
import { AuthService } from '@modules/users/services/auth.service';

@Injectable()
export class UserEffects {
  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(userActions.loadUser),
  //     mergeMap((action: any) => this.dbUser.signIn({ email: action.email, password: action.pass })
  //       .pipe(
  //         map((user) => userActions.loadedUser({ user })),
  //         catchError(() => EMPTY)
  //       )
  //     )
  //   )
  // );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      map((user) => userActions.loadedUser({ user })),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
    private dbUser: AuthService
  ) {}

}
