import {Component, OnDestroy, OnInit} from '@angular/core';
import { Account} from '../../shared';
import {LoginService} from '../../entrypoint/login/login.service';
import {AccountService} from '../../core/auth/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss']
})
export class TopnavbarComponent implements OnInit, OnDestroy {

  account: Account;

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
