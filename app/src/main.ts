import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformBrowser } from '@angular/platform-browser';

import { environment } from './config';

if (environment.production)
	enableProdMode();

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);