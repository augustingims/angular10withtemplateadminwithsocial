import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../core/user/user.service';
import {EventManager, IUser} from '../../shared';

@Component({
    selector: 'app-users-delete',
    templateUrl: './users-delete.component.html'
})
export class UsersDeleteComponent {

    user: IUser;

    constructor(
        private userService: UserService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager,
        private toastr: ToastrService
    ) {}

    cancel(): void {
        this.activeModal.dismiss();
    }

    confirmDelete(login: string): void {
        this.userService.delete(login).subscribe(() => {
            this.eventManager.broadcast({ name: 'userListModification', content: 'User Deleted' });
            this.activeModal.close(true);
            setTimeout(() => this.toastr.success('Utilisateur Supprimé avec succès'));
        });
    }
}
