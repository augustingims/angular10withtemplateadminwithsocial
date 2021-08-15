import {PageDeniedComponent} from './page-denied.component';

export const pagedeniedRoute = {
    path: '',
    component: PageDeniedComponent,
    data: {
      authorities: [],
      pageTitle: 'Error',
      error403: true
    }
  };
