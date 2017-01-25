import { EffectsModule } from '@ngrx/effects';

import { SessionEffects } from './session.effects'; 

export const EFFECTS = [
    EffectsModule.run(SessionEffects)
];