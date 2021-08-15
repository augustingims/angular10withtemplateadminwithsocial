import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {AccountService} from '../../core/auth/account.service';
import {EventManager} from '../../shared/service/event-manager.service';
import {StateStorageService} from '../../core/auth/state-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {TokenSocial} from '../../shared';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError: boolean;

  socialUser: SocialUser;

  loginForm = this.fb.group({
      username: [''],
      password: [''],
      rememberMe: [true]
  });

    constructor(
        private accountService: AccountService,
        private authService: SocialAuthService,
        private spinner: NgxSpinnerService,
        private eventManager: EventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
      document.body.className = 'hold-transition login-page';
      window.dispatchEvent(new Event('resize'));
      if (this.username) {
        this.username.nativeElement.focus();
      }
      if (this.isAuthenticated()) {
          this.router.navigate(['/dashboard']);
      }
    }

    cancel() {
        this.authenticationError = false;
        this.loginForm.patchValue({
            username: '',
            password: ''
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
      this.spinner.show();
      this.loginService
          .login({
              username: this.loginForm.get('username').value,
              password: this.loginForm.get('password').value,
              rememberMe: this.loginForm.get('rememberMe').value
          })
          .subscribe(() => {

            this.accountService.identity().subscribe(account => {
              this.authenticationError = false;
              if (this.router.url === '/login' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                this.router.navigate(['/dashboard']);
              }
              this.spinner.hide();
              this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
              });
              // previousState was set in the authExpiredInterceptor before being redirected to login modal.
              // since login is successful, go to stored previousState and clear previousState
              const redirect = this.stateStorageService.getUrl();
              if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigateByUrl(redirect);
              }

            });
          }, () => {
            this.spinner.hide();
            this.authenticationError = true;
          });
    }

  signInWithGoogle(): void {
    this.spinner.show();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenGoogle = new TokenSocial(this.socialUser.idToken);
        this.loginService.loginWithGoogle(tokenGoogle).subscribe(
          res => {
            this.accountService.identity().subscribe(account => {
              this.authenticationError = false;
              if (this.router.url === '/login' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                this.router.navigate(['/dashboard']);
              }
              this.spinner.hide();
              this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
              });
            });
          },
          err => {
            this.spinner.hide();
            this.authenticationError = true;
          }
        );
      }
    ).catch(
      err => {
        this.spinner.hide();
        this.authenticationError = true;
      }
    );
  }

  signInWithFB(): void {
    this.spinner.show();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenFace = new TokenSocial(this.socialUser.authToken);
        this.loginService.loginWithFacebook(tokenFace).subscribe(
          res => {
            this.accountService.identity().subscribe(account => {
              this.authenticationError = false;
              if (this.router.url === '/login' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                this.router.navigate(['/dashboard']);
              }
              this.spinner.hide();
              this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
              });
            });
          },
          err => {
            this.spinner.hide();
            this.authenticationError = true;
          }
        );
      }
    ).catch(
      err => {
        this.spinner.hide();
        this.authenticationError = true;
      }
    );
  }

}
