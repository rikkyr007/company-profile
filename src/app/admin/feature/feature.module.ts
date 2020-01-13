import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';

// Lazy Load routing
import { FeatureRoutingModule }           from "./feature-routing.module";
import { DataTablesModule }               from "angular-datatables";

// Component
import { FeatureComponent }               from "./feature.component";
import { FeatureEditComponent } from './feature-edit/feature-edit.component';

import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FeatureRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  declarations: [FeatureComponent, FeatureEditComponent]
})
export class FeatureModule {}