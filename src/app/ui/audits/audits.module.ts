import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {AuditsComponent, auditsRoute} from './';
import {CommonModule} from '@angular/common';

const ENTITY_STATES = [auditsRoute];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
      AuditsComponent
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuditsModule {}
