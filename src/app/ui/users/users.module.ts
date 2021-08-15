import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {usersRoute} from './users.route';
import {UsersUpdateComponent} from './users-update.component';
import {UsersDetailComponent} from './users-detail.component';
import {UsersComponent} from './users.component';
import {UsersDeleteComponent} from './users-delete.component';
import {CommonModule} from '@angular/common';


const ENTITY_STATES = [...usersRoute];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
      UsersComponent,
      UsersUpdateComponent,
      UsersDeleteComponent,
      UsersDetailComponent,
  ],
  entryComponents: [
      UsersUpdateComponent,
      UsersDeleteComponent,
      UsersDetailComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule {}
