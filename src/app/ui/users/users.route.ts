import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable} from '@angular/core';

import { UserService } from '../../core/user/user.service';
import {Authority, ResolvePagingParams, User} from '../../shared';
import {UserRouteAccessService} from '../../core/auth/user-route-access-service';
import {UsersComponent} from './users.component';
import {UsersUpdateComponent} from './users-update.component';



@Injectable({ providedIn: 'root' })
export class UsersResolve implements Resolve<any> {
    constructor(private service: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const login = route.params.login ? route.params.login : null;
        if (login) {
            return this.service.find(login);
        }
        return new User();
    }
}

export const usersRoute: Routes = [
    {
        path: '',
        component: UsersComponent,
        resolve: {
            pagingParams: ResolvePagingParams
        },
        data: {
            pageTitle: 'Gestion Utilisateurs',
            defaultSort: 'id,asc',
            authorities: [Authority.ADMIN]
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':login/edit',
        component: UsersUpdateComponent,
        resolve: {
            profil: UsersResolve
        },
        data: {
            pageTitle: 'Modification Utilisateur',
            authorities: [Authority.ADMIN]
        },
        canActivate: [UserRouteAccessService]
    }
];
