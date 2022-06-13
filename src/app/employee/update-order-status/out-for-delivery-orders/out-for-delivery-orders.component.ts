import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-out-for-delivery-orders',
  templateUrl: './out-for-delivery-orders.component.html',
  styleUrls: ['./out-for-delivery-orders.component.css']
})
export class OutForDeliveryOrdersComponent implements OnInit {

  defaultChecked?:string;

  orders?:any;

  constructor(public order_service:OrdersService, public userService:UserService) { }

  ngOnInit(): void {
    
    
    this.order_service.getOrderByStatus({status:"outForDelivery"})
    .subscribe((res:any)=>{
      console.log("In subscribe")
      console.log(res)

      this.orders = res["order"]
    })    
  }

  submitOrderStatusUpdate(orderRef:any){
    console.log(orderRef)
    for(let [k,v] of Object.entries(orderRef)){
      orderRef['id'] = k
      orderRef['status'] = v
      break;
    }

    this.order_service.updateOrderStatus(orderRef)
    .subscribe((res:any)=>{
      console.log(res)
      if(res.status){
        alert("Updated the status of the order")
        if (orderRef.status == "Cancelled") {
          let funds_info = {
            userName:res["userName"],
            funds:res["total"]
          }
      
          this.userService.addFunds(funds_info)
          .subscribe((res:any)=>{
          })
        }
      }else{
        alert("Issue with updating the order status")
      }
    })
  }
}