import { Component, OnInit, ChangeDetectorRef, NgZone }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { FeatureService }                                        from './feature.service'

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
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

      featureForm       : FormGroup
      dataUrl           : String = environment.api_url
      prefix            : String = environment.prefix
      prefix_admin      : String = environment.prefix_admin
      edited            : Boolean   = false
      image_url = environment.image_url
      imgUrl: String = null;
      selectedFiles: FileList
      currentFileUpload: File
      progress: { percentage: number } = { percentage: 0 }
      
  constructor(
              private fb                    : FormBuilder,
              private featureService        : FeatureService,
              private cd                    : ChangeDetectorRef,
              private router                : Router,
              private sweetalertService     : SweetalertService,
              private dynamicScriptLoader   : DynamicScriptLoaderService,
              private uploadFileService     : UploadFileService,
              private zone: NgZone) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
    let self = this;

    $(document).on('click', '#editFeature', function(){
      let id = $(this).data('id'); 
      self.zone.run(() => self.router.navigate([ self.prefix_admin +'/feature/edit/' + id]))
    });

    $(document).on('click', '#deleteFeature', function(){
      let id = $(this).data('id');
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          return self.featureService.destroyFeature(id)
                    .subscribe(() => {
                      // Reset Form after Save Agent
                      self.resetForm();
                      self.cd.detectChanges();
                      $('#featureDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  public createFeature(){
    this.featureService.saveFeature(this.featureForm.value)
                  .subscribe(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Data has been saved!');
                    this.router.navigate([this.prefix + '/' + this.prefix_admin + '/feature'])
                  })  
  }

  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)
 
    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/features','image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.featureForm.patchValue({ feature_image : myObj.fileName })
      }
    })
    this.selectedFiles = undefined
    }

  private createForm(){
    this.featureForm = this.fb.group({
      id                        : [''],
      feature_description       : ['',[Validators.required]],
      feature_image             : ['',[Validators.required]],
      feature_name              : ['',[Validators.required]]
    });
  }

  public resetForm(){
    this.id.reset()
    this.feature_description.reset()
    this.feature_image.reset()
    this.feature_name.reset()
    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.featureForm.get('id');
  }
  get feature_description(){
    return this.featureForm.get('feature_description');
  }
  get feature_image(){
    return this.featureForm.get('feature_image');
  }
  get feature_name(){
    return this.featureForm.get('feature_name');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      //$('#featureDatatables').DataTable();
      $('#featureDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/feature',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id',
                width: '10%'
              }, {
                data : 'feature_name',
                width: '20%'
              }, {
                data : 'feature_description',
                width: '30%'
              },{
                data: null,
                width: '20%', 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editFeature"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteFeature"
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
