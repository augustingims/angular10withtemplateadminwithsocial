import {LoginComponent} from './login.component';

export const loginRoute = {
    path: 'login',
    component: LoginComponent,
    data: {
        authorities: [],
        pageTitle: 'Login'
    }
  };
