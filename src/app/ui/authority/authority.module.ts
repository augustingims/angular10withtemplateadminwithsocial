import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {AuthorityComponent, AuthorityDeleteComponent, AuthorityDetailComponent, authorityRoute, AuthorityUpdateComponent} from './';

const ENTITY_STATES = [authorityRoute];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
      AuthorityComponent,
      AuthorityDeleteComponent,
      AuthorityDetailComponent,
      AuthorityUpdateComponent
  ],
  entryComponents: [
      AuthorityDeleteComponent,
      AuthorityDetailComponent,
      AuthorityUpdateComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthorityModule {}
