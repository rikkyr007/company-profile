import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { FoodpediaManagementRoutingModule }     from "./foodpedia-management-routing.module";
import { DataTablesModule }                     from "angular-datatables";

// Component
import { FoodpediaManagementComponent }         from "./foodpedia-management.component";

import { NgxEditorModule }                      from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FoodpediaManagementRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxEditorModule
  ],
  declarations: [FoodpediaManagementComponent]
})
export class FoodpediaManagementModule {}