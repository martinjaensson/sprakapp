import { EffectsModule } from '@ngrx/effects';

import { ErrorEffects } from './error.effects'; 
import { SessionEffects } from './session.effects'; 

export const EFFECTS = [
    EffectsModule.runAfterBootstrap(ErrorEffects),
    EffectsModule.run(SessionEffects)
];