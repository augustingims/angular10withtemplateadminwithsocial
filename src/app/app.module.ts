import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {EntrypointModule} from './entrypoint/entrypoint.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {UiModule} from './ui/ui.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    CoreModule,
    AppRoutingModule,
    EntrypointModule,
    UiModule
  ],
  providers: [
    {
      provide: 'SERVER_API_URL',
      useValue: environment.configs.backend
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
