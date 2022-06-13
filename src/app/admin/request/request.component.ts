import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/model.request';
import { ProductRequestService } from 'src/app/product-request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  items:Data[] = []
  constructor(public productService: ProductRequestService) {
    productService.getRequest().subscribe(result => {
      this.items = result.data
    })
   }

  ngOnInit(): void {
  }

  resolve(id:any) {
    this.productService.makeDeleteRequest(id).subscribe(result => {
      this.productService.getRequest().subscribe(result => {
        this.items = result.data
      })
    })
  }
}
