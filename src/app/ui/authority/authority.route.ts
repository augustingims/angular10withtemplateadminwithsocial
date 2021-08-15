import {Authority, ResolvePagingParams} from '../../shared';
import {AuthorityComponent} from './authority.component';
import {UserRouteAccessService} from '../../core/auth/user-route-access-service';

export const authorityRoute = {
    path: '',
    component: AuthorityComponent,
    resolve: {
      pagingParams: ResolvePagingParams
    },
    data: {
      pageTitle: 'authorities',
      defaultSort: 'name,asc',
      authorities: [Authority.ADMIN]
    },
    canActivate: [UserRouteAccessService]
  };
