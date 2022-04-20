import { ActionReducerMap } from '@ngrx/store';
import * as reducers from '@store/reducers';

export interface AppState {
  user: reducers.UserState;
  item: reducers.ItemState;
  expert: reducers.ExpertState;
  status: reducers.StatusState;
  service: reducers.ServiceState;
  history: reducers.HistoryState;
  accepted: reducers.AcceptedState;
  inProcess: reducers.InProcessState;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  user: reducers.userReducer,
  item: reducers.itemReducer,
  status: reducers.statusReducer,
  expert: reducers.expertReducer,
  service: reducers.serviceReducer,
  history: reducers.historyReducer,
  accepted: reducers.acceptedReducer,
  inProcess: reducers.inProcessReducer,
};
