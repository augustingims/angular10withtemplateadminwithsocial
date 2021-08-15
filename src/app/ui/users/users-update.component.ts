import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../core/user/user.service';
import {LANGUAGES, User} from '../../shared';

@Component({
    selector: 'app-users-update',
    templateUrl: './users-update.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersUpdateComponent implements OnInit {
    languages = LANGUAGES;
    user: User;
    authorities: string[] = [];
    isSaving = false;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {}

    editForm = this.fb.group({
      id: [],
      firstName: [null, [Validators.maxLength(50)]],
      lastName: [null, [Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
      activated: [],
      langKey: [],
      authorities: []
    });

    ngOnInit(): void {
        window.dispatchEvent(new Event('resize'));
        this.route.data.subscribe(({ profil }) => {
            if (profil) {
                this.user = profil;
                if (this.user.id === undefined) {
                    this.user.activated = true;
                }
                this.updateForm(profil);
            }
        });

        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
        });
    }

    save(): void {
        this.isSaving = true;
        this.user = this.updateUser();
        this.userService.update(this.user).subscribe(
            () => this.onSaveSuccess(),
            () => this.onSaveError()
        );
    }

    private updateForm(user: User): void {
        this.editForm.patchValue({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          activated: user.activated,
          langKey: user.langKey,
          authorities: user.authorities
        });
    }

    private updateUser(): any {
        return {
          id: this.user.id,
          firstName: this.editForm.get(['firstName']).value,
          lastName: this.editForm.get(['lastName']).value,
          email: this.editForm.get(['email']).value,
          activated: this.editForm.get(['activated']).value,
          langKey: this.editForm.get(['langKey']).value
        };
    }

    private onSaveSuccess(): void {
        this.isSaving = false;
        setTimeout(() => this.toastr.success('Utilisateur Modifié avec succès'));
        this.previousState();
    }

    private onSaveError(): void {
        this.isSaving = false;
        setTimeout(() => this.toastr.error('Erreur lors de la modification de l\'utilisateur'));
    }

    previousState() {
        window.history.back();
    }
}
