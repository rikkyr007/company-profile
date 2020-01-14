import { Component, OnInit, ChangeDetectorRef }     from '@angular/core';
import { FormBuilder, FormGroup, Validators }       from '@angular/forms';

// Service
import { MenusettingsService }                      from './menusettings.service'

import Swal                                         from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                        from '../../shared/services/sweetalert.service';
import { DynamicScriptLoaderService }               from '../../shared/services/dynamic-script.service';

// Environtment
import { environment }                              from 'src/environments/environment';

@Component({
  selector: 'app-menusettings',
  templateUrl: './menusettings.component.html',
  styleUrls: ['./menusettings.component.css']
})
export class MenusettingsComponent implements OnInit {

  menuForm                : FormGroup
  dataUrl                 : String = environment.api_url
  prefix_admin            : String = environment.prefix_admin
  edited                  : Boolean   = false

  constructor(
                private fb                  : FormBuilder,
                private menusettingsService : MenusettingsService,
                private cd                  : ChangeDetectorRef,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private sweetalertService   : SweetalertService
  ) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
    let self = this;

    $(document).on('click', '#editMenu', function(){
      let id = $(this).data('id');
      return self.menusettingsService.getMenuById(id)
                        .subscribe((data) => {
                          self.menuForm.setValue({
                            id              : data.id,
                            menu_link       : data.menu_link,
                            menu_name       : data.menu_name
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteMenu', function(){
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
          return self.menusettingsService.destroyMenu(id)
                      .subscribe(() => {
                      // Reset Form after Save Menu
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#menuDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  public createMenu(){
      this.menusettingsService.saveMenu(this.menuForm.value)
                  .subscribe(() => {
                  //isi disini
                  this.sweetalertService.yourWorkHasBeenSaved('Menu Has Been Save')
                  // Refresh Datatables after Save Agent
                  $('#menuDatatables').DataTable().ajax.reload();
                  // Reset Form after Save Agent
                  this.resetForm();
                  })
  }

  private createForm(){
    this.menuForm = this.fb.group({
      id                        : [''],
      menu_link                 : ['',[Validators.required]],
      menu_name                 : ['',[Validators.required]]
    });
  }

  public resetForm(){
    this.id.reset()
    this.menu_link.reset()
    this.menu_name.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.menuForm.get('id');
  }

  get menu_link(){
    return this.menuForm.get('menu_link');
  }

  get menu_name(){
    return this.menuForm.get('menu_name');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#menuDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/menu',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'menu_name'
              }, {
                data : 'menu_link'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editMenu"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteMenu"
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
