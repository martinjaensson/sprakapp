import { AppModule } from './app/app.module';
import { CONFIG } from './config';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (CONFIG.prodMode)
    enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);