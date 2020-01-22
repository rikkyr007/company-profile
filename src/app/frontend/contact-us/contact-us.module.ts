import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';

// Lazy Load routing
import { ContactUsRoutingModule }               from "./contact-us-routing.module";

// Component
import { ContactUsComponent }                   from "./contact-us.component";

@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ContactUsComponent]
})
export class ContactUsModule {}