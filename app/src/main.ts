import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CONFIG } from './config';

if (CONFIG.production)
    enableProdMode();

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

// Useless comment