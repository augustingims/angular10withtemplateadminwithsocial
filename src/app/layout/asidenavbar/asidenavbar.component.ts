import { Component, OnInit } from '@angular/core';
import {Account} from '../../shared';
import {LoginService} from '../../entrypoint/login/login.service';
import {Router} from '@angular/router';
import {AccountService} from '../../core/auth/account.service';

declare var $: any;

@Component({
  selector: 'app-asidenavbar',
  templateUrl: './asidenavbar.component.html',
  styleUrls: ['./asidenavbar.component.scss']
})
export class AsidenavbarComponent implements OnInit {

  account: Account;
  numberNotification: number;

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    $(() => {
      $('.my-menu').tree({
        animationSpeed: 500,
        accordion     : true,
        followLink    : false,
        trigger       : '.treeview a'
      });
    });
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });

  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

}
