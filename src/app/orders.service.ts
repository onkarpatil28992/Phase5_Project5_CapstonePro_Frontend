import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from './model.serverResponse'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  config:any = {
    deployed:false,
    URL:'http://localhost:',
    PORT:'4100',
    URL2:'/api'
  }

  // Temp arr of orders for testing purposes
  temp_order:any = {orders:[
    {tracking_id:1,recepient:"gali1",status:"pending"},
    {tracking_id:2,recepient:"bob",status:"shipped"},
    {tracking_id:3,recepient:"fred",status:"pending"},
    {tracking_id:4,recepient:"ned",status:"pending"},
    {tracking_id:5,recepient:"gali1",status:"shipped"},
    {tracking_id:6,recepient:"john",status:"delivered"},
    {tracking_id:7,recepient:"dave",status:"pending"},

    {tracking_id:8,recepient:"gali1",status:"cancelled"},
    {tracking_id:9,recepient:"dan",status:"outForDelivery"},
    {tracking_id:10,recepient:"gali1",status:"cancelled"},
    {tracking_id:11,recepient:"gali1",status:"shipped"},
    {tracking_id:12,recepient:"kevin",status:"outForDelivery"}
  ]}

  constructor(public http:HttpClient) { }

  getUserOrders(user_details:any):Observable<ServerResponse>{
    let username = user_details['id']
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/orders/getOrderByUser/'+username
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/orders/getOrderByUser/'+username
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.get<ServerResponse>(URL)

  }

  getOrderByStatus(order_details:any):Observable<ServerResponse>{
    let status = order_details['status']
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/orders/getOrdersByStatus/'+status
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/orders/getOrdersByStatus/'+status
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.get<ServerResponse>(URL)
  }

  getDailyOrderReports():Observable<ServerResponse>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/orders/getDailyReports/'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/orders/getDailyReports/'
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.get<ServerResponse>(URL)
  }

  getWeeklyOrderReports():Observable<ServerResponse>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/orders/getWeeklyReports/'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/orders/getWeeklyReports/'
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.get<ServerResponse>(URL)
  }

  getMonthlyOrderReports():Observable<ServerResponse>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/orders/getMonthlyReports/'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/orders/getMonthlyReports/'
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.get<ServerResponse>(URL)
  }

  updateOrderStatus(order_details:any):Observable<ServerResponse>{
    let id = order_details['id']
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/orders/updateStatus/'+id
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/orders/updateStatus/'+id
    } 
    console.log(`Traveling to: ${URL}`)
    return this.http.put<ServerResponse>(URL,order_details)
  }
}
