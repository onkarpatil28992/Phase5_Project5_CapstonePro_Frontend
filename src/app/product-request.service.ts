import { Injectable } from '@angular/core';
import { ServerResponse } from './model.serverResponse'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Request } from './model.request';

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {

  config:any = {
    deployed:false,
    URL:'http://localhost:',
    PORT:'4100',
    URL2:'/api'
  }

  constructor(public http:HttpClient) { }

  makeAddRequest(product_info:any):Observable<ServerResponse>{
    let URL:string
    console.log(product_info)
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/productrequest/addRequest'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/productrequest/addRequest'
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.post<ServerResponse>(URL,product_info)
  }

  makeDeleteRequest(product_info:any):Observable<ServerResponse>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/productrequest/deleteRequest/'+product_info
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/productrequest/deleteRequest/'+product_info
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.delete<ServerResponse>(URL)
  }

  getRequest():Observable<Request>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/productrequest/getRequest'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/productrequest/getRequest'
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.get<Request>(URL)
  }
}
