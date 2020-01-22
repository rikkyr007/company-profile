import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment } from 'src/environments/environment';

// service
import { AboutManagementService } from './about-management.service'

// SharedService
import { SweetalertService } from '../../shared/services/sweetalert.service';

@Component({
  selector: 'app-about-management',
  templateUrl: './about-management.component.html',
  styleUrls: ['./about-management.component.css']
})
export class AboutManagementComponent implements OnInit {

  constructor(
                private fb: FormBuilder,
                private aboutManagementService: AboutManagementService,
                private sweetalertService: SweetalertService
  ) { }

  ngOnInit() {
    this.createForm()
    this.initSetting()
  }

  aboutForm              : FormGroup;
  prefix_admin            : String  = environment.prefix_admin;

  saveAbout(){
       this.aboutManagementService.saveAbout(this.aboutForm.value)
                      .subscribe((data) => {
                        this.aboutForm.patchValue({
                        id:data.id
                        })
            this.sweetalertService.yourWorkHasBeenSaved("Settings has been Save")                   
         })
  }

  initSetting(){
    return this.aboutManagementService.getAboutByStatus("0")
      .subscribe((data) => {
        let data_about = data !== null ? data : null;

        if (data_about) {
             this.aboutForm.patchValue({
            id:data.id,  
            about_description: data_about.about_description
          })
        }              
      });
  }

  private createForm(){
    this.aboutForm  = this.fb.group({
      id                        : [null],
      about_description         : ['',[Validators.required]],
      status                    : [null]
   });
 }

  get id() {
  return this.aboutForm.get('id');
  }

  get status() {
  return this.aboutForm.get('status');
  }

  get about_description() {
  return this.aboutForm.get('about_description');
  }

}
