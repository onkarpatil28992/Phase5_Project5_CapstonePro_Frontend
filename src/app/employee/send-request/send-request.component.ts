import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { ProductRequestService } from 'src/app/product-request.service';
import { ProductService } from 'src/app/product.service';
//import { Product, Data } from '../model.product';
//import {ProductService} from '../product.service'


@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.css']
})
export class SendRequestComponent implements OnInit {
  products:Data[] = []

  constructor(public router: Router, public product_service: ProductService,public productRequest_service:ProductRequestService) { 
    product_service.getProducts().subscribe((result: { data: any[]; })=> {
      this.products = result.data
    })
   }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  
  add_1(inputElementId:any){
    var product_input:any = document.getElementById(inputElementId)

    if(product_input.value == ''){
      product_input.value = "1"
    }
    else{
      let curr_quantity = parseInt(product_input.value,10)
      curr_quantity++
      product_input.value = curr_quantity
    }
    return product_input.value
  }

  sub_1(inputElementId:any){
    var product_input:any = document.getElementById(inputElementId)

    if(product_input.value == ''){
    }
    else{
      let curr_quantity = parseInt(product_input.value,10)
      curr_quantity--
      product_input.value = curr_quantity
    }
    return product_input.value
  }

  addProductRequest(productQuantityRef:any,product_id:any){
    console.log(productQuantityRef)
    console.log(product_id)

    if (productQuantityRef > 0 && product_id != "") {
      let emp_id = sessionStorage.getItem('id')

      let pr_add_info = {
        id:product_id,
        emp_id:emp_id,
        quantity:productQuantityRef,
        request_type:"add"
      }
  
      this.productRequest_service.makeAddRequest(pr_add_info)
      .subscribe((res)=>{
        if(res.status){
          alert("Product Request has been sent")
        }else{
          alert("There is another request pending on the product")
        }
      })
    } else {
      alert("Invalid input")
    }

  }

  deleteProductRequest(productQuantityRef:any,product_id:any){
    console.log(productQuantityRef)
    console.log(product_id)

    if (productQuantityRef > 0 || productQuantityRef == "") {
      let emp_id = sessionStorage.getItem('id')

      let pr_delete_info = {
        id:product_id,
        emp_id:emp_id,
        quantity:productQuantityRef,
        request_type:"delete"
      }
      this.productRequest_service.makeAddRequest(pr_delete_info)
      .subscribe((res)=>{
        if(res.status){
          alert("Product Request has been sent")
        }else{
          alert("There is another request pending on the product")
        }
      })
    } else {
      alert("Invalid input")
    }
  }

}
