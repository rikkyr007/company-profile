import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment } from 'src/environments/environment';

// service
import { BannerService } from './banner.service'

// SharedService
import { SweetalertService } from '../../shared/services/sweetalert.service';
import { UploadFileService } from '../../shared/services/upload-file.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(
                private fb: FormBuilder,
                private uploadFileService: UploadFileService,
                private bannerService: BannerService,
                private sweetalertService: SweetalertService
  ) { }

  ngOnInit() {
    this.createForm()
    this.initSetting()
  }

  bannerForm              : FormGroup;
  image_url               = environment.image_url
  prefix_admin            : String  = environment.prefix_admin

  logoBannerUrl           : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  saveBanner(){
    console.log(this.bannerForm.value.code)
       this.bannerService.saveBanner(this.bannerForm.value)
                      .subscribe((data) => {
                        this.bannerForm.patchValue({
                        id:data.id
                        })
            this.sweetalertService.yourWorkHasBeenSaved("Settings has been Save")                   
         })
  }

  initSetting(){
    return this.bannerService.getSettingByStatus("0")
      .subscribe((data) => {
        let data_banner = data !== null ? data : null;

        if (data_banner) {
             this.bannerForm.patchValue({
            id:data.id,  
            banner_title: data_banner.banner_title,
            banner_description: data_banner.banner_description,
            banner_button_link: data_banner.banner_button_link,
            banner_image  :data_banner.banner_image
          })
          if (data_banner.banner_image) {
            this.logoBannerUrl = this.image_url + data_banner.banner_image
          }
        }              
      });
  }

  public selectFile(event, type_image) {
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/banners', 'image').subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse){
          let EventBodyString = event.body.toString()
          let myObj = JSON.parse(EventBodyString)

          if(type_image === 'banner_image'){
              this.logoBannerUrl = myObj.fileUrl
              this.bannerForm.patchValue({ banner_image : myObj.fileName })
          }
    }
    })
    this.selectedFiles = undefined
    }

    private createForm(){
      this.bannerForm  = this.fb.group({
        id                        : [null],
        banner_title              : ['',[Validators.required]],
        banner_description        : [''],
        banner_button_link        : [''],
        banner_image              : ['',[Validators.required]],
        status                    : [null]
     });
   }

    get id() {
    return this.bannerForm.get('id');
    }

    get status() {
      return this.bannerForm.get('status');
      }

    get banner_title() {
    return this.bannerForm.get('banner_title');
    }

    get banner_description() {
    return this.bannerForm.get('banner_description');
    }

    get banner_button_link() {
    return this.bannerForm.get('banner_button_link');
    }

    get banner_image() {
      return this.bannerForm.get('banner_image');
    }

}
