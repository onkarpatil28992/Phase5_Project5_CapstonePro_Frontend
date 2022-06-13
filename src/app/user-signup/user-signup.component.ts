import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service'

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  count = 1
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  constructor(public router: Router, public userService:UserService) { }

  ngOnInit(): void {
  }

  signUpUser(userInfo:any) {
    if (
      userInfo.firstName == "" ||
      userInfo.lastName == "" ||
      userInfo.email == "" ||
      userInfo.dod == "" ||
      userInfo.phoneNumber == "" ||
      userInfo.userAddress == "" ||
      userInfo.password == ""
    ){
      alert("One or more missing inputs")
    } else {
      if (this.userService.regexp.test(userInfo.email)) {
        this.userService.signUpUser(userInfo).subscribe(result=>{
          if (result.status) {
            alert(result.message)
            sessionStorage.setItem("userName", result.userName)
            this.router.navigate(["user"])
          } else {
            alert(result.message)
          }
        });
      } else {
        alert("Invalid email")
      }
    }
  }
}
