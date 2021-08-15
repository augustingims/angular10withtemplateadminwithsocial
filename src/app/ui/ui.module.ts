import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { UiRoutingModule } from './ui-routing.module';
import {LayoutModule} from '../layout/layout.module';
import {SharedModule} from '../shared/shared.module';

import {UiComponent} from './ui.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UiRoutingModule,
    LayoutModule
  ],
  declarations: [
      UiComponent,
  ],
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UiModule { }
