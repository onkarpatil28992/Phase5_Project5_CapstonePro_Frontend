import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-update-order-status',
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.css']
})
export class UpdateOrderStatusComponent implements OnInit {

  selectedOrderType?:any;

  constructor(public orders_service:OrdersService) { }

  ngOnInit(): void {
  }

  checkOrderType(selectedOrderTypeRef:any){
    console.log(selectedOrderTypeRef)
  }
}