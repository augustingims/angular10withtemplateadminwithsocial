import { NgModule } from '@angular/core';
import {SharedLibsModule} from './shared-libs.module';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import {PasswordStrengthBarComponent} from './component/password-bar/password-strength-bar.component';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  imports: [SharedLibsModule
  ],
  declarations: [PasswordStrengthBarComponent, HasAnyAuthorityDirective
  ],
  entryComponents: [
  ],
  exports: [
    SharedLibsModule,
    PasswordStrengthBarComponent,
    HasAnyAuthorityDirective,
    NgxSpinnerModule
  ],
})
export class SharedModule {}
