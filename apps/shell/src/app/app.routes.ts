import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './home/home';

export const appRoutes: Route[] = [
  { path: '', component: Home, pathMatch: 'full' },
  {
    path: 'mfe1',
    loadComponent: () =>
      loadRemoteModule('mfe1', './Component').then((m) => m.TestPage),
  },
  {
    path: 'mfe2',
    loadComponent: () =>
      loadRemoteModule('mfe2', './Component').then((m) => m.TestPage),
  },
];
