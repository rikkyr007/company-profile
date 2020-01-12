import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';

// Lazy Load routing
import { FeatureRoutingModule }           from "./feature-routing.module";

// Component
import { FeatureComponent }               from "./feature.component";

@NgModule({
  imports: [
    CommonModule,
    FeatureRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FeatureComponent]
})
export class FeatureModule {}