import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { AdminRoutingModule }                from "./admin-routing.module";

// Component
import { AdminComponent }           from "./admin.component";
import { HeaderComponent }          from './layout/header/header.component'
import { SidebarComponent }         from './layout/sidebar/sidebar.component';
import { MainComponent }            from './layout/main/main.component';
import { FooterComponent }          from './layout/footer/footer.component';
import { SettingComponent }         from './layout/setting/setting.component';

// Package
import { LoadingBarModule }             from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule }   from '@ngx-loading-bar/http-client';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingBarModule,
    LoadingBarHttpClientModule
  ],
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    FooterComponent,
    SettingComponent
  ],
  providers: []
})
export class AdminModule {}