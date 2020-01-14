import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { MenusettingsComponent }          from './menusettings.component';

const routes: Routes = [
    { path: '', component: MenusettingsComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MenusettingsRoutingModule { }