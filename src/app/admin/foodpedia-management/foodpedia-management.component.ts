import { Component, OnInit, ChangeDetectorRef, NgZone }         from '@angular/core';
import { FormBuilder, FormGroup, Validators }                   from '@angular/forms';

// Service
import { FoodpediaManagementService }                           from './foodpedia-management.service'

// Shared Service
import { DynamicScriptLoaderService }                           from '../../shared/services/dynamic-script.service';
import { SweetalertService }                                    from '../../shared/services/sweetalert.service';
import { UploadFileService }                                    from '../../shared/services/upload-file.service';
import Swal                                                     from 'sweetalert2/dist/sweetalert2.js';

// Environtment
import { environment }                                          from 'src/environments/environment';
import { HttpResponse, HttpEventType }                          from '@angular/common/http';
import { Router } from '@angular/router';

// Library
declare var $: any;

@Component({
  selector: 'app-foodpedia-management',
  templateUrl: './foodpedia-management.component.html',
  styleUrls: ['./foodpedia-management.component.css']
})
export class FoodpediaManagementComponent implements OnInit {

  constructor(
                private fb                                : FormBuilder,
                private foodpediaManagementService        : FoodpediaManagementService,
                private cd                                : ChangeDetectorRef,
                private router                            : Router,
                private sweetalertService                 : SweetalertService,
                private dynamicScriptLoader               : DynamicScriptLoaderService,
                private uploadFileService                 : UploadFileService,
                private zone                              : NgZone
  ) { }

  ngOnInit() {
    this.createForm();
    this.loadScripts();
  }

  foodpediaMgForm   : FormGroup
  dataUrl           : String        = environment.api_url
  prefix            : String        = environment.prefix
  prefix_admin      : String        = environment.prefix_admin
  edited            : Boolean       = false
  image_url                         = environment.image_url
  foodpedia_image1         : String = null;
  foodpedia_image2         : String = null;
  foodpedia_tagimage1      : String = null;
  foodpedia_tagimage2      : String = null;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }


  public createFoodpedia(){
    this.foodpediaManagementService.saveFeature(this.foodpediaMgForm.value)
                  .subscribe(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Data has been saved!');
                    this.router.navigate([this.prefix_admin + '/foodpedia-management'])
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
              this.foodpediaMgForm.patchValue({ foodpedia_image1 : myObj.fileName })
          }
        
          if (type_image === 'foodpedia_image2') {
              this.foodpedia_image2 = myObj.fileUrl
              this.foodpediaMgForm.patchValue({ foodpedia_image2: myObj.fileName })
          }

          if (type_image === 'foodpedia_tagimage1') {
              this.foodpedia_tagimage1 = myObj.fileUrl
              this.foodpediaMgForm.patchValue({ foodpedia_tagimage1: myObj.fileName })
          }

          if (type_image === 'foodpedia_tagimage2') {
            this.foodpedia_tagimage2 = myObj.fileUrl
            this.foodpediaMgForm.patchValue({ foodpedia_tagimage2: myObj.fileName })
          }
    }
    })
    this.selectedFiles = undefined
    }

    private createForm(){
      this.foodpediaMgForm = this.fb.group({
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
      return this.foodpediaMgForm.get('id');
    }
    get foodpedia_title() {
      return this.foodpediaMgForm.get('foodpedia_title');
    }
    get foodpedia_description() {
      return this.foodpediaMgForm.get('foodpedia_description');
    }
    get foodpedia_desctag1() {
      return this.foodpediaMgForm.get('foodpedia_desctag1');
    }
    get foodpedia_desctag2() {
      return this.foodpediaMgForm.get('foodpedia_desctag2');
    }
    get foodpedia_image_1() {
      return this.foodpediaMgForm.get('foodpedia_image1');
    }
    get foodpedia_image_2() {
      return this.foodpediaMgForm.get('foodpedia_image2');
    }
    get foodpedia_tagimage_1() {
      return this.foodpediaMgForm.get('foodpedia_tagimage1');
    }
    get foodpedia_tagimage_2() {
      return this.foodpediaMgForm.get('foodpedia_tagimage1');
    }

    public initDataTables(){
      let self = this;
      $(document).ready(function() {
        //$('#featureDatatables').DataTable();
        $('#foodpediaDatatables').DataTable({
          ajax: {
                  'type'	      : 'GET',
                  'url'	        : self.dataUrl +  '/list/foodpedia',
                  'contentType' : 'application/json',
                },
          'serverSide' : true,
          'responsive': true,
          columns : [{
                  data : 'id',
                  width: '10%'
                }, {
                  data : 'foodpedia_title',
                  width: '20%'
                }, {
                  data : 'foodpedia_description',
                  width: '30%'
                },{
                  data: null,
                  width: '20%', 
                  searchable: false,
                  orderable: false,
                  render: function (data, type, row) {
                  return `
                      <button id="editFoodpedia"
                              class="btn btn-icon icon-left btn-info"
                              data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
        
                      <button id="deleteFoodpedia"
                              class="btn btn-icon icon-left btn-danger"
                              data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
                  `;
              }
            }]
        });
  
      });
    }
  
    public loadScripts() {
      // You can load multiple scripts by just providing the key as argument into load method of the service
      this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
        // Script Loaded Successfully
        this.initDataTables()
      }).catch(error => console.log(error));
    }
}
