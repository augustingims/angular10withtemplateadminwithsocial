import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthorityService} from './authority.service';
import {EventManager, IAuthority} from '../../shared';

@Component({
  selector: 'app-authority-delete',
  templateUrl: './authority-delete.component.html'
})
export class AuthorityDeleteComponent {

  authority: IAuthority;

  constructor(private authorityService: AuthorityService, public activeModal: NgbActiveModal, private eventManager: EventManager) { }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(name) {
    this.authorityService.delete(name).subscribe(response => {
      this.eventManager.broadcast({ name: 'authorityListModification', content: 'Deleted a authority' });
      this.activeModal.close(true);
    });
  }

}
