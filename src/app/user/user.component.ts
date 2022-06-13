import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Product, Data } from '../model.product';
import { UserService } from '../user.service'
import{FundsComponent} from './funds/funds.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  items:Data[] = []
  showCart = false
  showEdit = false
  localCart:Array<Array<any>> = []
  cart:any[] = []
  currentUser = sessionStorage.getItem("userName")
  showFunds = false
  showHome = true
  showOrder = false
  totalQty=0;
  cartTotal=0;
  curr_funds=0;
  itemSelected = new Map()

  constructor(public router:Router, private locationStrategy: LocationStrategy, public userService:UserService) {
    this.preventBackButton()
    userService.getProducts().subscribe(result=> {
      this.items = result.data
      console.log(result.data);
      console.log(this.items);
    })
    if (this.currentUser != null) {
      userService.getUserByUsername(this.currentUser).subscribe((result:any) => {
        console.log(result.user[0].cart)
        let user_details = result['user'][0]
        this.curr_funds = user_details['funds']
        this.cart = result.user[0].cart
        for(let i=0; i < this.cart.length; i++) {
          this.itemSelected.set(this.cart[i].id, [(this.cart[i].quantity),(this.cart[i].total/this.cart[i].quantity).toPrecision(2)])
        }
        this.localCart = Array.from(this.itemSelected)
        this.cartTotalCal()
      })
    }
   }

  ngOnInit(): void {
   
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, "", location.href);
    })
  }

  logout_user() {
    let logout:boolean = confirm("Are you sure you want to log out?")
    if(logout){
      sessionStorage.clear()
      this.router.navigate([''])      
    }
  }

  addToCart(item:string,itmPrice:any) {
    if (this.itemSelected.has(item)) {
      this.itemSelected.set(item, [(this.itemSelected.get(item)[0] + 1),itmPrice.toPrecision(2)])
    } else {
      this.itemSelected.set(item, [1,itmPrice.toPrecision(2)])
    }
    this.localCart = Array.from(this.itemSelected)
    console.log("LOCAL CART "+this.localCart);
    this.updateCartDB(item);
    //this.cartTotalCal();
  }

  

  showCartBtn() {
    this.showCart = true
    this.showEdit = false
  }

  showEditBtn() {
    this.showHome = false
    this.showCart = false
    this.showFunds = false
    this.showEdit = true
    this.showOrder = false
  }

  showFundBtn(){
    this.showHome = false
    this.showCart = false;
    this.showEdit = false
    this.showFunds = true;
    this.showOrder = false
  }

  homeBtn() {
    this.showCart = false
    this.showEdit = false
    this.showFunds = false
    this.showHome = true
    this.showOrder = false
  }

  showOrderBtn() {
    this.showCart = false
    this.showEdit = false
    this.showFunds = false
    this.showHome = false
    this.showOrder = true
  }

  removeFromCart(item:Array<any>) {
    let index = this.localCart.indexOf(item)
    this.localCart.splice(index, 1)
    this.itemSelected.delete(item[0]);
    this.updateCartDB(item[0]);
  }

  updateFromCart(item:String,qty:string) {
    if (parseInt(qty) > 0) {
      if (this.itemSelected.has(item)) {
        this.itemSelected.set(item,[parseInt(qty),this.itemSelected.get(item)[1]]);
      } 
      this.localCart = Array.from(this.itemSelected)
      this.updateCartDB(item);
    } else {
      alert("Invalid input")
    }
  }

  updateCartDB(item:String){
    this.cart = []
    for(let i = 0; i < this.localCart.length; i++) {
      let obj = {
        id: this.localCart[i][0],
        quantity: this.localCart[i][1][0],
        total: this.localCart[i][1][0] * this.localCart[i][1][1]
      }
      this.cart.push(obj)
    }
    let userCart = {
      userName: sessionStorage.getItem('userName'),
      cart: this.cart
    }
    this.cartTotalCal();
    this.userService.updateProfile(userCart)
  }

  cartTotalCal(){
    this.totalQty=0;
    this.cartTotal=0;
    for (let [key, value] of this.itemSelected) {
      this.totalQty+=value[0];
      var itemTotal=parseFloat((value[0]*value[1]).toPrecision(2));
      this.cartTotal+=itemTotal;
    }
  }
 
  fundsUpdate(){
    if (this.currentUser != null) {
      this.userService.getUserByUsername(this.currentUser).subscribe((result:any) => {
        let user_details = result['user'][0]
        this.curr_funds = user_details['funds']
        console.log(this.curr_funds);
       
      })
    }
  }

  buyOrder() {
    console.log("check buy")
    this.fundsUpdate();
    if (this.cartTotal<=0){
      alert("Please add items to the cart");
    }else if (this.curr_funds < this.cartTotal){
       var msg=this.currentUser+"  have Insufficient Funds  $" + this.curr_funds+".Please add funds to your account";
       alert(msg);
    }else {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let funds = this.cartTotal * -1

    let date = mm + '/' + dd + '/' + yyyy;
    let order = {
      id: this.makeOrderId(),
      userName: sessionStorage.getItem('userName'),
      status: "Pending",
      cart: this.cart,
      total: this.cartTotal,
      date: date
    }
    console.log("Clicked")
    console.log(order)
    this.userService.createOrder(order).subscribe(result => {
      console.log(result)
      this.totalQty = 0
      this.cartTotal = 0
      this.cart = []
      this.localCart = []
      this.itemSelected = new Map()
      let userCart = {
        userName: sessionStorage.getItem('userName'),
        cart: this.cart
      }
      this.userService.updateProfile(userCart)

      let funds_info = {
        userName:sessionStorage.getItem('userName'),
        funds:funds
      }
      this.userService.addFunds(funds_info).subscribe((res:any)=>{
      })
    })
    }
  }

  makeOrderId():String {
    let min = Math.ceil(100000000000)
    let max = Math.floor(999999999999)
    let num = Math.floor(Math.random() * (max - min) + min)
    return `${num}`
  }

}
