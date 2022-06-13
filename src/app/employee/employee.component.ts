import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // Bool flags for subpage toggles
  clicked_sendReqPage:boolean = true
  clicked_updateOrderStatus:boolean = false
  clicked_unlockUsers:boolean = false
  clicked_editProfile:boolean = false
  logout_employee:boolean = false
  currentEmployee = sessionStorage.getItem("employee")

  constructor(private locationStrategy: LocationStrategy, public router:Router) { 
    this.preventBackButton()
  }

  ngOnInit(): void {
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, "", location.href);
    })
  }

  showSendRequestBtn(){
    this.clicked_sendReqPage = true
    this.clicked_updateOrderStatus = false
    this.clicked_unlockUsers = false
    this.clicked_editProfile = false
    this.logout_employee = false
  }

  showUpdateOrderStatusBtn(){
    this.clicked_sendReqPage = false
    this.clicked_updateOrderStatus = true
    this.clicked_unlockUsers = false
    this.clicked_editProfile = false
    this.logout_employee = false
  }

  showUnlockUsersBtn(){
    this.clicked_sendReqPage = false
    this.clicked_updateOrderStatus = false
    this.clicked_unlockUsers = true
    this.clicked_editProfile = false
    this.logout_employee = false
  }

  showEditBtn(){
    this.clicked_sendReqPage = false
    this.clicked_updateOrderStatus = false
    this.clicked_unlockUsers = false
    this.clicked_editProfile = true
    this.logout_employee = false
  }
  
  logout_user(){
    if (confirm("Are you sure you want to log out?")) {
      this.router.navigate([""])
    }
  }

}
