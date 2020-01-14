import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Lazy Load routing
import { WebsettingsRoutingModule } from "./websettings-routing.module";

// Component
import { WebsettingsComponent } from "./websettings.component";
import { DataTablesModule } from 'angular-datatables';

import { NgxEditorModule } from 'ngx-editor';

@NgModule({
    imports: [
        CommonModule,
        WebsettingsRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTablesModule,
        NgxEditorModule
    ],
    declarations: [
        WebsettingsComponent,
    ]
})
export class WebSettingsModule { }