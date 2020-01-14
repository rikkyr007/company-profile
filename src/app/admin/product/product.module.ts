import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule }              from '@angular/forms';

// Lazy Load routing
import { ProductRoutingModule }             from "./product-routing.module";
import { DataTablesModule }                 from "angular-datatables";

// Component
import { ProductComponent }            from './product.component';

import { NgxEditorModule }                  from 'ngx-editor';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxEditorModule
  ],
  declarations: [ProductComponent, ProductEditComponent]
})
export class ProductModule {}