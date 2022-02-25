/* eslint-disable @typescript-eslint/naming-convention */
import { ActionReducerMap } from '@ngrx/store';
import * as reducers from '@store/reducers';


export interface AppState {
  user: reducers.UserState;
  service: reducers.ServiceState;
  history: reducers.HistoryState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  user: reducers.userReducer,
  service: reducers.serviceReducer,
  history: reducers.historyReducer,
};
