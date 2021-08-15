import { Route } from '@angular/router';

import { AuditsComponent } from './audits.component';
import {UserRouteAccessService} from '../../core/auth/user-route-access-service';
import {Authority} from '../../shared';

export const auditsRoute: Route = {
  path: '',
  component: AuditsComponent,
  data: {
    pageTitle: 'Audits',
    defaultSort: 'auditEventDate,desc',
    authorities: [Authority.ADMIN]
  },
  canActivate: [UserRouteAccessService]
};
