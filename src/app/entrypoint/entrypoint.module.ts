import { NgModule } from '@angular/core';
import { EntrypointRoutingModule } from './entrypoint-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {CommonModule} from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EntrypointRoutingModule
  ],
  declarations: [
    LoginComponent,
    ErrorComponent,
    ChangePasswordComponent,
    ResetPasswordComponent
  ]
})
export class EntrypointModule { }
