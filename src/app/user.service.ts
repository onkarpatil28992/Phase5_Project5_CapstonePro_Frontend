import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';
import { ServerResponse } from './model.serverResponse'
import { Product } from './model.product'
import { User } from './model.user'
import { Ticket } from './model.ticket'
import { Order } from './model.order';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  temp_users:any = {"users":[
    {id:1,name:"joe",locked:1},
    {id:2,name:"dan",locked:1},
    {id:3,name:"kevin",locked:0},
    {id:4,name:"eric",locked:1},
    {id:5,name:"mary",locked:0},
    {id:6,name:"randy",locked:1},
    {id:7,name:"andrea",locked:1},
    {id:8,name:"oliver",locked:1}
  ]}

  config:any = {
    deployed:false,
    URL:'http://localhost:',
    PORT:'4100',
    URL2:'/api'
  }

  constructor(public http:HttpClient) { }

  getUserByUsername(username:string):Observable<User>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/profile/getUser/'+username;
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/profile/getUser/'+username;
    }
    console.log("[LOG]: Traveling to: " + URL)
    return this.http.get<User>(URL)
  }

  send_logout_request(){
    
  }

  get_userData(){
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/profile/updateuser'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/profile/updateuser'
    }
    return this.http.get(URL)
  }

  updateProfile(profileUpdates:any){
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/profile/updateuser'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/profile/updateuser'
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.put(URL,profileUpdates).subscribe(response=>console.log(response),err=>console.log(err));
  }

  updatePassword(password_info:any):Observable<ServerResponse>{
    let username = password_info['userName']
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/profile/updatepassword/'+username
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/profile/updatepassword/'+username
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.put<ServerResponse>(URL,password_info)
  }

  addFunds(fundAmount:any){
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/profile/addFunds'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/profile/addFunds'
    }
    console.log(`Going to: ${URL}`)
    return this.http.post(URL,fundAmount)
  }

  signUpUser(user:any):Observable<ServerResponse>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/auth/signup'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/auth/signup'
    }
    return this.http.post<ServerResponse>(URL,user)
  }

  signInUser(user:any):Observable<ServerResponse>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/auth/login'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/auth/login'
    }
    return this.http.post<ServerResponse>(URL,user)
  }

  getProducts():Observable<Product> {
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/products/getallproducts'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/products/getallproducts'
    }
    return this.http.get<Product>(URL)
  };

  createTicket(ticket:any):Observable<ServerResponse> {
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/tickets/createticket'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/tickets/createticket'
    }
    return this.http.post<ServerResponse>(URL,ticket)
  }

  getTickets():Observable<Ticket> {
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/tickets/getalltickets'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/tickets/getalltickets'
    }
    return this.http.get<Ticket>(URL)
  }

  deleteTicket(userName:any):Observable<ServerResponse> {
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/tickets/deletetticket/'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/tickets/deletetticket/'
    }
    return this.http.delete<ServerResponse>(URL+userName)
  }
  
  createOrder(order:any):Observable<ServerResponse> {
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/orders/createorder'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/orders/createorder'
    }
    return this.http.post<ServerResponse>(URL,order)
  }
  
  getAllOrders():Observable<Order> {
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/orders/getallorders'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/orders/getallorders'
    }
    return this.http.get<Order>(URL)
  }
}
