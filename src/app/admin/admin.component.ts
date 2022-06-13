import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { Data } from '../model.order';
import { ProductService } from '../product.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  count = 1
  reports:Data[] = []
  reportShow:Data[] = []
  items?:any = []
  employees?:any = []

  showReport =  true
  showEdit = false
  showProduct = false
  showRequest = false

  constructor(
    private locationStrategy: LocationStrategy, 
    public router: Router,
    public admin_service:AdminService, 
    public userService:UserService,
    public productService:ProductService,
    public orderService:OrdersService) { 
    this.preventBackButton()
    userService.getAllOrders().subscribe(result => {
      console.log(result)
      this.reports = result.data
      this.reportShow = this.reports
    })
    userService.getProducts().subscribe(result=> {
      this.items = result.data
      console.log(result.data);
      console.log(this.items);
    })
    admin_service.getAllEmployee().subscribe(result => {
      this.employees = result
    })
  }

  ngOnInit(): void {
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, "", location.href);
    })
  }

  logOut() {
    if (confirm("Are you sure you want to log out?")) {
      this.router.navigate([""])
    }
  }

  addEmployee(employee:any) {
    if (this.userService.regexp.test(employee.email)) {
      this.admin_service.addEmployee(employee)
      .subscribe(res=>{
        if (res.status) {
          alert(res.message)
          this.admin_service.getAllEmployee().subscribe(result => {
            this.employees = result
          })
        } else {
          alert(res.message)
        }
      })
    } else {
      alert("Invalid email")
    }
  }

  deleteEmployee(employeeID:any) {
    if (confirm(`Do you want to delete ${employeeID}?`)) {
      this.admin_service.deleteEmployee(employeeID)
      .subscribe(res=> {
        if (res.status) {
          alert(res.message)
        } else {
          alert(res.message)
        }
        this.admin_service.getAllEmployee().subscribe(result => {
          this.employees = result
        })
      })
    }
  }
  
  customize(custom:any) {
    console.log(custom)
    if (custom.customerID != "" && custom.productID != "" && custom.customerID != null && custom.productID != null) {
      this.reportShow = []
      for(let i=0; i < this.reports.length; i++) {
        if(this.reports[i].userName == custom.customerID) {
          this.reportShow.push(this.reports[i])
        }
      }
      let temp = this.reportShow
      this.reportShow = []
      for(let i=0; i < temp.length; i++) {
        for(let j=0; j < temp[i].cart.length; j++) {
          if(temp[i].cart[j].id.toLowerCase() == custom.productID.toLowerCase()) {
            this.reportShow.push(temp[i])
            break
          }
        }
      }
    } else {
      if (custom.customerID != "" && custom.customerID != null) {
        this.reportShow = []
        for(let i=0; i < this.reports.length; i++) {
          if(this.reports[i].userName == custom.customerID) {
            this.reportShow.push(this.reports[i])
          }
        }
      }
  
      if (custom.productID != "" && custom.productID != null) {
        this.reportShow = []
        for(let i=0; i < this.reports.length; i++) {
          for(let j=0; j < this.reports[i].cart.length; j++) {
            if(this.reports[i].cart[j].id.toLowerCase() == custom.productID.toLowerCase()) {
              this.reportShow.push(this.reports[i])
              break
            }
          }
        }
      }
    }
  }

  resetTable() {
    this.reportShow = this.reports
  }

  daily() {
    this.orderService.getDailyOrderReports()
    .subscribe((res:any)=>{
      console.log(res.data)
      this.reportShow = res.data
    })    
  }

  weekly() {
    this.orderService.getWeeklyOrderReports()
    .subscribe((res:any)=>{
      console.log(res.data)
      this.reportShow = res.data
    })
  }

  monthly() {
    this.orderService.getMonthlyOrderReports()
    .subscribe((res:any)=>{
      console.log(res.data)
      this.reportShow = res.data
    })
  }

  showReportBtn() {
    this.showReport = true
    this.showEdit = false
    this.showProduct = false
    this.showRequest = false
  }

  showEditBtn() {
    this.showReport = false
    this.showEdit = true
    this.showProduct = false
    this.showRequest = false
  }

  showProducts() {
    this.showReport = false
    this.showEdit = false
    this.showProduct = true
    this.showRequest = false
  }
  showRequests() {
    this.showReport = false
    this.showEdit = false
    this.showProduct = false
    this.showRequest = true
  }

  addProduct(product:any) {
    console.log(product)
    this.admin_service.addProduct(product)
    .subscribe(res=>{
      console.log(res)
      if(res.status){
        alert("Product has been added")
        this.userService.getProducts().subscribe(result=> {
          this.items = result.data
          console.log(result.data);
          console.log(this.items);
        })
      }else{
        alert("Product already exists!")
      }
    })
  }

  removeProduct(id:any) {
    if (confirm(`Do you want to delete ${id}?`)) {
      this.productService.deleteProducts(id).subscribe(result => {
        this.userService.getProducts().subscribe(result=> {
          this.items = result.data
          console.log(result.data);
          console.log(this.items);
        })
      })
    }
  }

  updateProduct(id:any, quantity:any) {
    let product  = {
      id: id,
      quantity: quantity
    }
    console.log(product)
    this.admin_service.updateProduct(product)
    .subscribe((res:any)=>{
      console.log(res)
      if(res.status){
        alert("Product has been updated")
        this.userService.getProducts().subscribe(result=> {
          this.items = result.data
          console.log(result.data);
          console.log(this.items);
        })
      }else{
        alert("Issue with updating product")
      }
    })
  }
}
