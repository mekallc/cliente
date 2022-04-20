/* eslint-disable @typescript-eslint/naming-convention */
import { UserEffects } from './user.effects';
import { ItemEffects } from './item.effects';
import { ExpertEffects } from './expert.effects';
import { StatusEffects } from './status.effects';
import { ServiceEffects } from './service.effects';
import { HistoryEffects } from './history.effects';
import { AcceptedEffects } from './accepted.effects';
import { InProcessEffects } from './in_process.effects';


export const EffectsArray: any[] = [
  UserEffects, ServiceEffects, InProcessEffects, HistoryEffects, AcceptedEffects,
  ItemEffects, StatusEffects, ExpertEffects,
];
