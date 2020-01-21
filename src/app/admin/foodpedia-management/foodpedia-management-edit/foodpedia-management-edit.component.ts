// Core
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

//service
import { FoodpediaManagementService } from '../foodpedia-management.service';
import { UploadFileService } from '../../../shared/services/upload-file.service';
import { SweetalertService } from '../../../shared/services/sweetalert.service';

// Environtment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-foodpedia-management-edit',
  templateUrl: './foodpedia-management-edit.component.html',
  styleUrls: ['./foodpedia-management-edit.component.css']
})
export class FoodpediaManagementEditComponent implements OnInit {

  constructor(
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private foodpediaManagementService: FoodpediaManagementService,
                private uploadFileService: UploadFileService,
                private sweetalertService: SweetalertService
  ) {
                this.createForm()
                this.initValue()
  }

  ngOnInit() {
  }

  foodpediaMgEditForm        : FormGroup
  dataUrl                    : String        = environment.api_url
  prefix                     : String        = environment.prefix
  prefix_admin               : String        = environment.prefix_admin
  edited                     : Boolean       = false
  image_url                                  = environment.image_url
  foodpedia_image1                  : String = null;
  foodpedia_image2                  : String = null;
  foodpedia_tagimage1               : String = null;
  foodpedia_tagimage2               : String = null;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  public updateFoodpedia() {
    this.route.params.subscribe(params => {
     return this.foodpediaManagementService.updateFoodpedia(params['id'], this.foodpediaMgEditForm.value)
       .subscribe(() => {
         this.sweetalertService.yourWorkHasBeenSaved('foodpedia Has Been Updated')
         this.router.navigate([this.prefix_admin + '/foodpedia-management'])
       })
   })
 }

 public selectFile(event, type_image) {
  this.progress.percentage = 0
  this.selectedFiles = event.target.files
  this.currentFileUpload = this.selectedFiles.item(0)
  this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/foodpedias', 'image').subscribe(event => {
  if (event.type === HttpEventType.UploadProgress) {
    this.progress.percentage = Math.round(100 * event.loaded / event.total);
  } else if (event instanceof HttpResponse){
        let EventBodyString = event.body.toString()
        let myObj = JSON.parse(EventBodyString)

        if(type_image === 'foodpedia_image1'){
            this.foodpedia_image1 = myObj.fileUrl
            this.foodpediaMgEditForm.patchValue({ foodpedia_image1 : myObj.fileName })
        }
      
        if (type_image === 'foodpedia_image2') {
            this.foodpedia_image2 = myObj.fileUrl
            this.foodpediaMgEditForm.patchValue({ foodpedia_image2: myObj.fileName })
        }

        if (type_image === 'foodpedia_tagimage1') {
            this.foodpedia_tagimage1 = myObj.fileUrl
            this.foodpediaMgEditForm.patchValue({ foodpedia_tagimage1: myObj.fileName })
        }

        if (type_image === 'foodpedia_tagimage2') {
          this.foodpedia_tagimage2 = myObj.fileUrl
          this.foodpediaMgEditForm.patchValue({ foodpedia_tagimage2: myObj.fileName })
        }
  }
  })
  this.selectedFiles = undefined
  }

  public initValue() {
    this.route.params.subscribe(params => {
        return this.foodpediaManagementService.getFoodpediaById(params['id'])
        .subscribe((data) => {
          this.foodpediaMgEditForm.setValue({
            id                          : data.id,
            foodpedia_title             : data.foodpedia_title,
            foodpedia_description       : data.foodpedia_description,
            foodpedia_desctag1          : data.foodpedia_desctag1,
            foodpedia_desctag2          : data.foodpedia_desctag2,
            foodpedia_image1            : data.foodpedia_image1,
            foodpedia_image2            : data.foodpedia_image2,
            foodpedia_tagimage1         : data.foodpedia_tagimage1,
            foodpedia_tagimage2         : data.foodpedia_tagimage2
          })
          this.foodpedia_image1 = this.image_url + "" + data.foodpedia_image1
          this.foodpedia_image1 = this.image_url + "" + data.foodpedia_image2
          this.foodpedia_tagimage1 = this.image_url + "" + data.foodpedia_tagimage1
          this.foodpedia_tagimage2 = this.image_url + "" + data.foodpedia_tagimage2
        })
    })
  }

  private createForm(){
    this.foodpediaMgEditForm = this.fb.group({
      id                                : [''],
      foodpedia_title                   : ['',[Validators.required]],
      foodpedia_description             : ['',[Validators.required]],
      foodpedia_desctag1                : ['',[Validators.required]],
      foodpedia_desctag2                : ['',[Validators.required]],
      foodpedia_image1                  : ['',[Validators.required]],
      foodpedia_image2                  : ['',[Validators.required]],
      foodpedia_tagimage1               : ['',[Validators.required]],
      foodpedia_tagimage2               : ['',[Validators.required]]
    });
  }

  get id() {
    return this.foodpediaMgEditForm.get('id');
  }
  get foodpedia_title() {
    return this.foodpediaMgEditForm.get('foodpedia_title');
  }
  get foodpedia_description() {
    return this.foodpediaMgEditForm.get('foodpedia_description');
  }
  get foodpedia_desctag1() {
    return this.foodpediaMgEditForm.get('foodpedia_desctag1');
  }
  get foodpedia_desctag2() {
    return this.foodpediaMgEditForm.get('foodpedia_desctag2');
  }
  get foodpedia_image_1() {
    return this.foodpediaMgEditForm.get('foodpedia_image1');
  }
  get foodpedia_image_2() {
    return this.foodpediaMgEditForm.get('foodpedia_image2');
  }
  get foodpedia_tagimage_1() {
    return this.foodpediaMgEditForm.get('foodpedia_tagimage1');
  }
  get foodpedia_tagimage_2() {
    return this.foodpediaMgEditForm.get('foodpedia_tagimage1');
  }

}
