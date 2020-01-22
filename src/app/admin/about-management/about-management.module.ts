import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule }              from '@angular/forms';

// Lazy Load routing
import { AboutManagementRoutingModule }     from "./about-management-routing.module";
import { DataTablesModule }                 from "angular-datatables";

// Component
import { AboutManagementComponent }         from "./about-management.component";

import { NgxEditorModule }                  from 'ngx-editor';

@NgModule({
    imports: [
      CommonModule,
      AboutManagementRoutingModule,
      ReactiveFormsModule,
      DataTablesModule,
      NgxEditorModule
    ],
    declarations: [AboutManagementComponent]
  })
  export class AboutManagementModule {}