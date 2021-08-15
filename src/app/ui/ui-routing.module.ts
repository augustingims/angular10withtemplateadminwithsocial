import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UiComponent} from './ui.component';

const routes: Routes = [
    {
        path: '',
        component: UiComponent,
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
          },
          {
            path: 'pagedenied',
            loadChildren: () => import('./page-denied/page-denied.module').then(m => m.PageDeniedModule)
          },
          {
            path: 'audits',
            loadChildren: () => import('./audits/audits.module').then(m => m.AuditsModule)
          },
          {
            path: 'users',
            loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
          },
          {
            path: 'authorities',
            loadChildren: () => import('./authority/authority.module').then(m => m.AuthorityModule)
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiRoutingModule { }
