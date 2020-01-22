import { Component, OnInit, ChangeDetectorRef, NgZone }         from '@angular/core';
import { FormBuilder, FormGroup, Validators }                   from '@angular/forms';

// Service
import { ContactUsService }                                     from './contact-us.service'

// Shared Service
import { DynamicScriptLoaderService }                           from '../../shared/services/dynamic-script.service';
import { SweetalertService }                                    from '../../shared/services/sweetalert.service';
import Swal                                                     from 'sweetalert2/dist/sweetalert2.js';

// Environtment
import { environment }                                          from 'src/environments/environment';
import { HttpResponse, HttpEventType }                          from '@angular/common/http';
import { Router }                                               from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(
                private fb                    : FormBuilder,
                private contactUsService      : ContactUsService,
                private cd                    : ChangeDetectorRef,
                private router                : Router,
                private sweetalertService     : SweetalertService,
                private dynamicScriptLoader   : DynamicScriptLoaderService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  contactForm       : FormGroup

  public createContact(){
    this.contactUsService.sendContact(this.contactForm.value)
                  .subscribe(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Thanks for contact us!');
                    this.resetForm();
                  })  
  }

  private createForm(){
    this.contactForm = this.fb.group({
      id                    : [''],
      full_name             : ['',[Validators.required]],
      email                 : ['',[Validators.required]],
      message               : ['',[Validators.required]]
    });
  }

  public resetForm(){
    this.id.reset()
    this.full_name.reset()
    this.email.reset()
    this.message.reset()
  }

  get id(){
    return this.contactForm.get('id');
  }

  get full_name(){
    return this.contactForm.get('full_name');
  }

  get email(){
    return this.contactForm.get('email');
  }

  get message(){
    return this.contactForm.get('message');
  }
}
