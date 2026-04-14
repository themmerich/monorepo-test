import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './home/home';

export const appRoutes: Route[] = [
  { path: '', component: Home, pathMatch: 'full' },
  {
    path: 'cbs',
    loadChildren: () =>
      loadRemoteModule('cbs', './routes').then((m) => m.CBS_ROUTES),
  },
  {
    path: 'wau',
    loadChildren: () =>
      loadRemoteModule('wau', './routes').then((m) => m.WAU_ROUTES),
  },
];
