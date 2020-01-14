import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule }              from '@angular/forms';

// Lazy Load routing
import { MenusettingsRoutingModule }        from "./menusettings-routing.module";
import { DataTablesModule }                 from "angular-datatables";

// Component
import { MenusettingsComponent }            from "./menusettings.component";

import { NgxEditorModule }                  from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    MenusettingsRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxEditorModule
  ],
  declarations: [MenusettingsComponent]
})
export class MenusettingsModule {}