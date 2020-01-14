import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { ProductComponent }                 from './product.component';
import { ProductEditComponent   }           from './product-edit/product-edit.component';

const routes: Routes = [
    { path: '', component: ProductComponent},
    { path: 'edit/:id', component: ProductEditComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ProductRoutingModule { }