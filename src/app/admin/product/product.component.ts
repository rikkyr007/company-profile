import { Component, OnInit, ChangeDetectorRef, NgZone }          from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { ProductService }                                        from './product.service'

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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private fb                    : FormBuilder,
    private productService        : ProductService,
    private cd                    : ChangeDetectorRef,
    private router                : Router,
    private sweetalertService     : SweetalertService,
    private dynamicScriptLoader   : DynamicScriptLoaderService,
    private uploadFileService     : UploadFileService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
    let self = this;

    $(document).on('click', '#editProduct', function(){
      let id = $(this).data('id'); 
      self.zone.run(() => self.router.navigate([ self.prefix_admin +'/product/edit/' + id]))
    });

    $(document).on('click', '#deleteProduct', function(){
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
          return self.productService.destroyProduct(id)
                    .subscribe(() => {
                      // Reset Form after Save Agent
                      self.resetForm();
                      self.cd.detectChanges();
                      $('#productDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  productForm       : FormGroup
  dataUrl           : String = environment.api_url
  prefix_admin      : String = environment.prefix_admin
  edited            : Boolean   = false
  image_url = environment.image_url
  imgUrl: String = null;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  public createProduct(){
    this.productService.saveProduct(this.productForm.value)
                  .subscribe(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Data has been saved!');
                    this.router.navigate([this.prefix_admin + '/product'])
                  })  
  }

  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)
 
    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/products','image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.productForm.patchValue({ product_image : myObj.fileName })
      }
    })
    this.selectedFiles = undefined
    }

  private createForm(){
    this.productForm = this.fb.group({
      id                         : [''],
      product_description        : ['',[Validators.required]],
      product_name               : ['',[Validators.required]],
      product_price              : ['',[Validators.required]],
      product_image              : ['',[Validators.required]]
    });
  }

  public resetForm(){
    this.id.reset()
    this.product_description.reset()
    this.product_name.reset()
    this.product_price.reset()
    this.product_image.reset()
    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.productForm.get('id');
  }
  get product_description(){
    return this.productForm.get('product_description');
  }
  get product_name(){
    return this.productForm.get('product_name');
  }
  get product_price(){
    return this.productForm.get('product_price');
  }
  get product_image(){
    return this.productForm.get('product_image');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      //$('#featureDatatables').DataTable();
      $('#productDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/product',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id',
                width: '10%'
              }, {
                data : 'product_name',
                width: '20%'
              }, {
                data : 'product_description',
                width: '20%'
              },{
                data : 'product_price',
                width: '30%'
              },{
                data: null,
                width: '20%', 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editProduct"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteProduct"
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
