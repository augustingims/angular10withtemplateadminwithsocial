import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {PageDeniedComponent, pagedeniedRoute} from './';
import {CommonModule} from '@angular/common';

const ENTITY_STATES = [pagedeniedRoute];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
      PageDeniedComponent
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageDeniedModule {}
