import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {loginRoute} from './login/login.route';
import {changePasswordRoute} from './change-password/change-password.route';
import {resetPasswordRoute} from './reset-password/reset-password.route';
import {errorRoute} from './error/error.route';
const routes: Routes = [
  loginRoute,
  resetPasswordRoute,
  changePasswordRoute,
  ...errorRoute
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrypointRoutingModule { }
