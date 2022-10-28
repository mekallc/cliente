import { ActionReducerMap } from '@ngrx/store';
import * as reducers from '@store/reducers';

export interface AppState {
  user: reducers.UserState;
  item: reducers.ItemState;
  rating: reducers.RatingState;
  expert: reducers.ExpertState;
  finished: reducers.FinishedState;
  cancelled: reducers.CancelledState;
  score: reducers.ScoreState;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  user: reducers.userReducer,
  item: reducers.itemReducer,
  rating: reducers.ratingReducer,
  expert: reducers.expertReducer,
  finished: reducers.finishedReducer,
  cancelled: reducers.cancelledReducer,
  score: reducers.scoreReducer,
};
