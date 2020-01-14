  
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment } from 'src/environments/environment';

// service
import { WebSettingsService } from './websettings.service'

// SharedService
import { SweetalertService } from '../../shared/services/sweetalert.service';
import { UploadFileService } from '../../shared/services/upload-file.service';

@Component({
  selector: 'app-websettings',
  templateUrl: './websettings.component.html',
  styleUrls: ['./websettings.component.css']
})
export class WebsettingsComponent implements OnInit {

  constructor(
              private fb: FormBuilder,
              private uploadFileService: UploadFileService,
              private websettingsService: WebSettingsService,
              private sweetalertService: SweetalertService
  ) { }

  ngOnInit() {
    this.createForm()
    this.initSetting()
  }

  websettingsForm         : FormGroup;
  image_url               = environment.image_url
  prefix_admin            : String  = environment.prefix_admin

  logoFbUrl               : String = null;
  logoInstagramUrl        : String = null;
  logoTwitterUrl          : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  settingApply(){
    console.log(this.websettingsForm.value.code)
       this.websettingsService.saveWebSettings(this.websettingsForm.value)
                      .subscribe((data) => {
                        this.websettingsForm.patchValue({
                          id:data.id
                        })
            this.sweetalertService.yourWorkHasBeenSaved("Settings has been Save")                   
         })
      
  }

  initSetting(){
    
    return this.websettingsService.getSettingByStatus("0")
      .subscribe((data) => { 
        console.log(data) 
           
        let data_setting = data !== null ? data : null;

        if (data_setting) {
             this.websettingsForm.patchValue({
            id:data.id,  
            address: data_setting.address,
            email: data_setting.email,
            copyright: data_setting.copyright,
            status  :data_setting.status,
            logo_fb: data_setting.logo_fb,
            logo_instagram:data_setting.logo_instagram,
            logo_twitter:data_setting.logo_twitter,
            no_telp: data_setting.no_telp,
            no_fax: data_setting.no_fax,
            web_tittle: data_setting.web_tittle
          })
          if (data_setting.logo_fb) {
            this.logoFbUrl = this.image_url + data_setting.logo_fb
          }

          if (data_setting.logo_twitter) {
            this.logoTwitterUrl = this.image_url + data_setting.logo_twitter
          }

          if (data_setting.logo_instagram) {
            this.logoInstagramUrl = this.image_url + data_setting.logo_instagram
          }
        }              
      });
  }

  public selectFile(event, type_image) {
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/websettings', 'image').subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse){
          let EventBodyString = event.body.toString()
          let myObj = JSON.parse(EventBodyString)

          if(type_image === 'logo_fb'){
              this.logoFbUrl = myObj.fileUrl
              this.websettingsForm.patchValue({ logo_fb : myObj.fileName })
          }
        
          if (type_image === 'logo_instagram') {
              this.logoInstagramUrl = myObj.fileUrl
              this.websettingsForm.patchValue({ logo_instagram: myObj.fileName })
          }

          if (type_image === 'logo_twitter') {
                this.logoTwitterUrl = myObj.fileUrl
                this.websettingsForm.patchValue({ logo_twitter: myObj.fileName })
          }
    }
    })
    this.selectedFiles = undefined
    }

    private createForm(){
      this.websettingsForm  = this.fb.group({
        id                        : [null],
        web_tittle                : ['',[Validators.required]],
        address                   : [''],
        copyright                 : [''],
        email                     : [''],
        status                    : [null],
        logo_fb                   : [''],
        logo_instagram            : [''],
        logo_twitter              : [''],
        no_fax                    : [''], 
        no_telp                   : [''],
     });
   }

        get id() {
        return this.websettingsForm.get('id');
        }

        get status() {
        return this.websettingsForm.get('status');
        }

        get web_tittle() {
        return this.websettingsForm.get('web_tittle');
        }

        get address() {
        return this.websettingsForm.get('address');
        }

        get copyright() {
          return this.websettingsForm.get('copyright');
        }

        get email() {
          return this.websettingsForm.get('email');
        }

        get logo_fb() {
          return this.websettingsForm.get('logo_fb');
        }

        get logo_instagram() {
          return this.websettingsForm.get('logo_instagram');
        }

        get logo_twitter() {
          return this.websettingsForm.get('logo_twitter');
        }

        get no_fax() {
          return this.websettingsForm.get('no_fax');
        }

        get no_telp() {
          return this.websettingsForm.get('no_telp');
        }
}
