import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import locale from '@angular/common/locales/fr';

import * as moment from 'moment';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import {NgbDateMomentAdapter} from '../shared';
import {AuthInterceptor} from '../blocks/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from '../blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from '../blocks/interceptor/errorhandler.interceptor';
import {NotificationInterceptor} from '../blocks/interceptor/notification.interceptor';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

const fbLoginOptions = {
  scope: 'email,user_location,pages_user_locale,user_photos,public_profile,pages_user_timezone',
  return_scopes: true,
  enable_profile_selector: true
};

const googleLoginOptions = {
  scope: 'profile email'
};

@NgModule({
  imports: [
    HttpClientModule,
    SocialLoginModule,
    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-' })
  ],
  providers: [
    Title,
    CookieService,
    {
      provide: LOCALE_ID,
      useValue: 'fr',
    },
    { provide: NgbDateAdapter, useClass: NgbDateMomentAdapter },
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '45564208929-ru0b19m8u2ibnbjv82rejibon51cfrip.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('2603221913305033')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
})
export class CoreModule {
  constructor(dpConfig: NgbDatepickerConfig) {
    registerLocaleData(locale);
    dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
