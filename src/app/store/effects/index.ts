/* eslint-disable @typescript-eslint/naming-convention */
import { UserEffects } from './user.effects';
import { ServiceEffects } from './service.effects';
import { HistoryEffects } from './history.effects';
import { AcceptedEffects } from './accepted.effects';
import { InProcessEffects } from './in_process.effects';


export const EffectsArray: any[] = [
  UserEffects, ServiceEffects, InProcessEffects, HistoryEffects, AcceptedEffects
];
