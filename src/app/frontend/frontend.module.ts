import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { FrontendRoutingModule }              from "./frontend-routing.module";

// Component
import { FrontendComponent }                  from "./frontend.component";
import { HeaderComponent }                    from './layout/header/header.component';
import { FooterComponent }                    from './layout/footer/footer.component';

// Package
import { LoadingBarModule }                   from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule }         from '@ngx-loading-bar/http-client';


@NgModule({
  imports: [
    CommonModule,
    FrontendRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingBarModule,
    LoadingBarHttpClientModule
  ],
  declarations: [
    FrontendComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: []
})
export class FrontendModule { }