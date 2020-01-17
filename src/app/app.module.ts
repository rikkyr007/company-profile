import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';

import { AppRoutingModule }             from './app-routing.module';
import { AppComponent }                 from './app.component';
import { HttpClientModule }             from '@angular/common/http';
import { FontAwesomeModule }            from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule }          from '@angular/forms';
import { DynamicScriptLoaderService }   from './shared/services/dynamic-script.service';
import { SweetalertService }            from './shared/services/sweetalert.service';
import { ApiService }                   from './shared/services/api.service';
import { XRequestService }              from './shared/services/xrequest.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    DynamicScriptLoaderService,
    ApiService,
    SweetalertService,
    XRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
