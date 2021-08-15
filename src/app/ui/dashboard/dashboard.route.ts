import {DashboardComponent} from './dashboard.component';
import {UserRouteAccessService} from '../../core/auth/user-route-access-service';
import { Authority } from 'src/app/shared';

export const dashboardRoute = {
    path: '',
    component: DashboardComponent,
    data: {
      pageTitle: 'Dashboard',
      authorities: [Authority.ADMIN, Authority.GFC, Authority.DR, Authority.CDC, Authority.DA]
    },
    canActivate: [UserRouteAccessService]
  };
