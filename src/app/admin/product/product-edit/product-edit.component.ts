// Core
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

//service
import { ProductService } from '../product.service';
import { UploadFileService } from '../../../shared/services/upload-file.service';
import { SweetalertService } from '../../../shared/services/sweetalert.service';

// Environtment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(
                private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService,
                private uploadFileService: UploadFileService,
                private sweetalertService: SweetalertService
  ) {
                this.createForm()
                this.initValue()
  }

  ngOnInit() {
  }

  editProduct: FormGroup
  image_url: String = environment.image_url
  prefix_admin: String = environment.prefix_admin

  imgUrl: String = null;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  public updateProduct() {
    this.route.params.subscribe(params => {
     return this.productService.updateProduct(params['id'], this.editProduct.value)
       .subscribe(() => {
         this.sweetalertService.yourWorkHasBeenSaved('product Has Been Updated')
         this.router.navigate([this.prefix_admin + '/product'])
       })
   })
 }

 public selectFile(event) {
  this.progress.percentage = 0
  this.selectedFiles = event.target.files
  this.currentFileUpload = this.selectedFiles.item(0)

  this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/products', 'image').subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      let EventBodyString = event.body.toString()
      let myObj = JSON.parse(EventBodyString)
      this.imgUrl = myObj.fileUrl
      this.editProduct.patchValue({ product_image: myObj.fileName })
    }
    })
    this.selectedFiles = undefined
  }

  public initValue() {
    this.route.params.subscribe(params => {
        return this.productService.getProductById(params['id'])
        .subscribe((data) => {
          this.editProduct.setValue({
            id                    : data.id,
            product_description   : data.product_description,
            product_name          : data.product_name,
            product_price         : data.product_price,
            product_image         : data.product_image
          })
          this.imgUrl = this.image_url + "" + data.product_image
        })
    })
  }

  private createForm(){
    this.editProduct = this.fb.group({
      id                         : [''],
      product_description        : ['',[Validators.required]],
      product_name               : ['',[Validators.required]],
      product_price              : ['',[Validators.required]],
      product_image              : ['',[Validators.required]]
    });
  }

  get product_description(){
    return this.editProduct.get('product_description');
  }
  get product_name(){
    return this.editProduct.get('product_name');
  }
  get product_price(){
    return this.editProduct.get('product_price');
  }
  get product_image(){
    return this.editProduct.get('product_image');
  }

}
