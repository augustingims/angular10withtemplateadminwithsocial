import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import {Login, Account, ITokenSocial} from '../../shared';
import {AccountService} from '../../core/auth/account.service';
import {AuthServerProvider} from '../../core/auth/auth-jwt.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {}

  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  }

  loginWithGoogle(tokenSocial: ITokenSocial): Observable<Account | null> {
    return this.authServerProvider.loginWithGoogle(tokenSocial).pipe(flatMap(() => this.accountService.identity(true)));
  }

  loginWithFacebook(tokenSocial: ITokenSocial): Observable<Account | null> {
    return this.authServerProvider.loginWithFacebook(tokenSocial).pipe(flatMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
  }
}
