import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule }              from '@angular/forms';

// Lazy Load routing
import { BannerRoutingModule }             from "./banner-routing.module";
import { DataTablesModule }                 from "angular-datatables";

// Component
import { BannerComponent }                 from "./banner.component";

import { NgxEditorModule }                  from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    BannerRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxEditorModule
  ],
  declarations: [BannerComponent]
})
export class BannerModule {}