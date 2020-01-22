import { NgModule }                         from "@angular/core";
import { CommonModule }                     from '@angular/common';

// Lazy Load routing
import { ContactDetailRoutingModule }           from "./contact-detail-routing.module";

// Component
import { ContactDetailComponent }               from "./contact-detail.component";

@NgModule({
  imports: [
    CommonModule,
    ContactDetailRoutingModule
  ],
  declarations: [ContactDetailComponent]
})
export class ContactDetailModule {}