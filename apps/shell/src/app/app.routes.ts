import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './home/home';

export const appRoutes: Route[] = [
  { path: '', component: Home, pathMatch: 'full' },
  {
    path: 'mfe1',
    loadChildren: () =>
      loadRemoteModule('mfe1', './routes').then((m) => m.MFE1_ROUTES),
  },
  {
    path: 'mfe2',
    loadComponent: () =>
      loadRemoteModule('mfe2', './Component').then((m) => m.TestPage),
  },
];
