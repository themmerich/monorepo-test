import { Route } from '@angular/router';
import { Layout } from './layout/layout';
import { Provisionen } from '@monorepo-test/domain/provision/feature-search';
import { Provision } from '@monorepo-test/domain/provision/feature-detail';
import { ProvisionEdit } from '@monorepo-test/domain/provision/feature-edit';
import { Provisionsbezeichnungen } from '@monorepo-test/domain/provision/feature-provisionsbezeichnungen';
import { Gebuehren } from '@monorepo-test/domain/provision/feature-gebuehren';
import { Provisionstypen } from '@monorepo-test/domain/provision/feature-provisionstypen';

export const PROVISION_ROUTES: Route[] = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'provisionen' },
      { path: 'provisionen', component: Provisionen },
      { path: 'provision', component: Provision },
      { path: 'provision/edit', component: ProvisionEdit },
      { path: 'provisionsbezeichnungen', component: Provisionsbezeichnungen },
      { path: 'gebuehren', component: Gebuehren },
      { path: 'provisionstypen', component: Provisionstypen },
    ],
  },
];
