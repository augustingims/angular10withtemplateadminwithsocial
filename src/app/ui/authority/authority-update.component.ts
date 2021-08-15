import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthorityService} from './authority.service';
import {EventManager, IAuthority} from '../../shared';

@Component({
  selector: 'app-authority-update',
  templateUrl: './authority-update.component.html'
})
export class AuthorityUpdateComponent {

  authority: IAuthority;

  newForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  constructor(public activeModal: NgbActiveModal,
              private eventManager: EventManager,
              private fb: FormBuilder,
              private authorityService: AuthorityService) { }


  clear() {
    this.activeModal.dismiss('cancel');
  }

  private authorityForm(): any {
    return {
      name: this.newForm.get(['name']).value
    };
  }

  save() {
    this.authority = this.authorityForm();
    this.authorityService.create(this.authority).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
  }

  private onSaveSuccess(result) {
    this.eventManager.broadcast({ name: 'authorityListModification', content: 'Created a authority' });
    this.activeModal.close(true);
  }

  private onSaveError() {

  }
}
