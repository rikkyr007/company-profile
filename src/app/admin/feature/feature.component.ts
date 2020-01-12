import { Component, OnInit, ChangeDetectorRef }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { FeatureService }                                        from './feature.service'

// Shared Service
import { DynamicScriptLoaderService }                           from '../../shared/services/dynamic-script.service';

// Environtment
import { environment }                                           from 'src/environments/environment';

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
      edited            : Boolean   = false
      
  constructor(
              private fb                  : FormBuilder,
              private featureService      : FeatureService,
              private cd                  : ChangeDetectorRef,
              private dynamicScriptLoader   : DynamicScriptLoaderService
             ) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
    let self = this;
  }

  public createFeature(){
    this.featureService.saveFeature(this.featureForm.value)
                  .subscribe(() => {
                    
                  })
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
      $('#featureDatatables').DataTables({
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
                width: '5%'
              }, {
                data : 'feature_description',
                width: '30%'
              },{
                data : 'feature_image',
                width: '20%'
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
