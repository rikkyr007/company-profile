import { Component, OnInit, ChangeDetectorRef, NgZone }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
// import {  }                                        from ''

// Shared Service
import { DynamicScriptLoaderService }                           from '../../shared/services/dynamic-script.service';
import { SweetalertService }                                    from '../../shared/services/sweetalert.service';
import { UploadFileService }                                    from '../../shared/services/upload-file.service';
import Swal                                                     from 'sweetalert2/dist/sweetalert2.js';

// Environtment
import { environment }                                          from 'src/environments/environment';
import { HttpResponse, HttpEventType }                          from '@angular/common/http';
import { Router }                                               from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  constructor(
                private dynamicScriptLoader   : DynamicScriptLoaderService,
  ) { }

  ngOnInit() {
    this.loadScripts()
  }
  
  dataUrl           : String = environment.api_url

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      //$('#featureDatatables').DataTable();
      $('#contactDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/contact',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id',
                width: '10%'
              }, {
                data : 'full_name',
                width: '20%'
              }, {
                data : 'email',
                width: '30%'
              },{
                data : 'message',
                width: '30%'
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
