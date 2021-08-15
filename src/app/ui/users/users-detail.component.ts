import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IUser} from '../../shared';

@Component({
    selector: 'app-users-detail',
    templateUrl: './users-detail.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersDetailComponent {

    user: IUser;

    constructor(
        public activeModal: NgbActiveModal
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
