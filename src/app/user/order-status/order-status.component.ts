import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  orders?:any;

  constructor(public user_service:UserService,public order_service:OrdersService) { }

  ngOnInit(): void {
    let userDetails = {
      id:sessionStorage.getItem('userName')
    }

    this.order_service.getUserOrders(userDetails)
    .subscribe((res:any)=>{
      console.log("In subscribe")
      console.log(res)

      this.orders = res["order"]
      
    })

  }

}
