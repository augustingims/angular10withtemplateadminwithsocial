import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EventManager, IAuthority} from '../../shared';

@Component({
  selector: 'app-authority-detail',
  templateUrl: './authority-detail.component.html'
})
export class AuthorityDetailComponent {

  authority: IAuthority;

  constructor(public activeModal: NgbActiveModal, private eventManager: EventManager) { }

  clear() {
    this.activeModal.dismiss('cancel');
  }
}
