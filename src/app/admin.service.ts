import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerResponse } from './model.serverResponse';
import { Observable } from 'rxjs';
import { Employee } from './model.employee';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  config:any = {
    deployed:false,
    URL:'http://localhost:',
    PORT:'4100',
    URL2:'/api'
  }

  constructor(public http:HttpClient) { }

  sendCredentials(admin:any):Observable<ServerResponse>{
    let URL:string;
    if(this.config['deployed']){
      URL = this.config["URL2"]+"/v1/admin/login"
    }else{
      URL = this.config["URL"]+this.config["PORT"]+"/v1/admin/login"
    }
    console.log("[LOG]: Going to: " + URL)
    return this.http.post<ServerResponse>(URL,admin)
    
  }

  addEmployee(employee_details:any):Observable<ServerResponse>{
    let URL:string;
    if(this.config['deployed']){
      URL = this.config['URL2']+"/v1/employees/addemployee"
    }else{
      URL = this.config["URL"]+this.config["PORT"]+"/v1/employees/addemployee"
    }
    console.log("[LOG]: Going to: " + URL)
    return this.http.post<ServerResponse>(URL,employee_details)
  }

  deleteEmployee(employee_details:any):Observable<ServerResponse>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+"/v1/employees/deleteemployee/"+employee_details
    }else{
      URL = this.config["URL"]+this.config["PORT"]+"/v1/employees/deleteemployee/"+employee_details
    }
    console.log("[LOG]: Going to: " + URL)
    return this.http.delete<ServerResponse>(URL)
  }

  getAllEmployee():Observable<Employee>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+"/v1/employees/getallemployees"
    }else{
      URL = this.config["URL"]+this.config["PORT"]+"/v1/employees/getallemployees"
    }
    console.log("[LOG]: Going to: " + URL)
    return this.http.get<Employee>(URL)
  }

  addProduct(product_info:any):Observable<ServerResponse>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+"/v1/products/addproduct/"
    }else{
      URL = this.config["URL"]+this.config["PORT"]+"/v1/products/addproduct/"
    }
    console.log("[LOG]: Going to: " + URL)
    return this.http.post<ServerResponse>(URL,product_info)
  }

  updateProduct(product_info:any, ):Observable<ServerResponse>{
    let product_id = product_info['id']
    let URL:string;
    if(this.config['deployed']){
      URL = this.config['URL2']+`/v1/products/update/${product_id}`
    }else{
      URL = this.config["URL"]+this.config["PORT"]+`/v1/products/update/${product_id}`
    }
    console.log("[LOG]: Going to: " + URL)
    return this.http.put<ServerResponse>(URL,product_info)
  }

  deleteProduct(product_info:any):Observable<ServerResponse>{
    let product_id = product_info['id']
    let URL:string
    if(this.config['deployed']){
      URL = this.config["URL2"]+`/v1/products/deleteproduct/${product_id}`
    }else{
      URL = this.config["URL"]+this.config["PORT"]+`/v1/products/deleteproduct/${product_id}`
    }
    console.log("[LOG]: Going to: " + URL)
    return this.http.delete<ServerResponse>(URL)
  }


}
