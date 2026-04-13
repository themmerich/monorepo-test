import { Route } from '@angular/router';
import { Layout } from './layout/layout';
import { Provisionen } from './pages/provisionen/provisionen';
import { Provision } from './pages/provision/provision';
import { Provisionsbezeichnungen } from './pages/provisionsbezeichnungen/provisionsbezeichnungen';
import { Gebuehren } from './pages/gebuehren/gebuehren';
import { Provisionstypen } from './pages/provisionstypen/provisionstypen';

export const MFE1_ROUTES: Route[] = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'provisionen' },
      { path: 'provisionen', component: Provisionen },
      { path: 'provision', component: Provision },
      { path: 'provisionsbezeichnungen', component: Provisionsbezeichnungen },
      { path: 'gebuehren', component: Gebuehren },
      { path: 'provisionstypen', component: Provisionstypen },
    ],
  },
];
