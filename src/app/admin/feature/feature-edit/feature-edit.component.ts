// Core
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

//service
import { FeatureService } from '../feature.service';
import { UploadFileService } from '../../../shared/services/upload-file.service';
import { SweetalertService } from '../../../shared/services/sweetalert.service';

// Environtment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feature-edit',
  templateUrl: './feature-edit.component.html',
  styleUrls: ['./feature-edit.component.css']
})
export class FeatureEditComponent implements OnInit {
  editFeature: FormGroup
  image_url: String = environment.image_url
  prefix_admin: String = environment.prefix_admin

  imgUrl: String = null;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  constructor(  private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private featureService: FeatureService,
                private uploadFileService: UploadFileService,
                private sweetalertService: SweetalertService
              ) { 
                this.createForm()
                this.initValue()
              }

  ngOnInit() {
  }

  public updateFeature() {
    this.route.params.subscribe(params => {
     return this.featureService.updateFeature(params['id'], this.editFeature.value)
       .subscribe(() => {
         this.sweetalertService.yourWorkHasBeenSaved('Feature Has Been Updated')
         this.router.navigate([this.prefix_admin + '/feature'])
       })
   })
 }

 public selectFile(event) {
  this.progress.percentage = 0
  this.selectedFiles = event.target.files
  this.currentFileUpload = this.selectedFiles.item(0)

  this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/features', 'image').subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      let EventBodyString = event.body.toString()
      let myObj = JSON.parse(EventBodyString)
      this.imgUrl = myObj.fileUrl
      this.editFeature.patchValue({ feature_image: myObj.fileName })
    }
    })
    this.selectedFiles = undefined
  }

  public initValue() {
    this.route.params.subscribe(params => {
        return this.featureService.getFeatureById(params['id'])
        .subscribe((data) => {
          this.editFeature.setValue({
            id                   : data.id,
            feature_description  : data.feature_description,
            feature_image        : data.feature_image,
            feature_name         : data.feature_name
          })
          this.imgUrl = this.image_url + "" + data.feature_image
        })
    })
  }

  private createForm(){
    this.editFeature = this.fb.group({
      id                        : [''],
      feature_description       : ['',[Validators.required]],
      feature_image             : ['',[Validators.required]],
      feature_name              : ['',[Validators.required]]
    });
  }

  get feature_description(){
    return this.editFeature.get('feature_description');
  }
  get feature_image(){
    return this.editFeature.get('feature_image');
  }
  get feature_name(){
    return this.editFeature.get('feature_name');
  }


}
