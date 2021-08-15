import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { AsidenavbarComponent } from './asidenavbar/asidenavbar.component';
import { FooternavbarComponent } from './footernavbar/footernavbar.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [AsidenavbarComponent, FooternavbarComponent, TopnavbarComponent],
  exports: [AsidenavbarComponent, FooternavbarComponent, TopnavbarComponent]
})
export class LayoutModule { }
