import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules, RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone'; // ✅ IMPORT CORRECTO

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { Storage } from '@ionic/storage-angular';

import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

addIcons(allIcons);

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(), // ✅ FUNCIONA porque está bien importado
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes, withPreloading(PreloadAllModules)),
    Storage
  ],
});
