import { Injectable } from '@angular/core';

import Swal                         from '../../../../node_modules/sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  yourWorkHasBeenSaved(message){
    return Swal.fire({
      position: 'top-end',
      type: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  
}
