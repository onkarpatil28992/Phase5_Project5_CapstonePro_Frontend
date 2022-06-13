import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';
import { ServerResponse } from './model.serverResponse'
import { Product } from './model.product'
import { User } from './model.user'
import { Ticket } from './model.ticket'

@Injectable({
    providedIn: 'root'
  })

  export class ProductService{
    config:any = {
      deployed:false,
      URL:'http://localhost:',
      PORT:'4100',
      URL2:'/api'
    }
    
    constructor(public http:HttpClient) { }
      
    getProducts():Observable<Product> {
      let URL:string
      if(this.config['deployed']){
        URL = this.config['URL2']+'/v1/products/getallproducts'
      }else{
        URL = this.config['URL']+this.config['PORT']+'/v1/products/getallproducts'
      }
      console.log(`Traveling to: ${URL}`)
      return this.http.get<Product>(URL)
    }

    deleteProducts(id:any):Observable<ServerResponse> {
      let URL:string
      if(this.config['deployed']){
        URL = this.config['URL2']+'/v1/products/deleteproduct/'+id
      }else{
        URL = this.config['URL']+this.config['PORT']+'/v1/products/deleteproduct/'+id
      }
      console.log(`Traveling to: ${URL}`)
      return this.http.delete<ServerResponse>(URL)
    }
  }