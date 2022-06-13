import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userMap = new Map()
  attempts = 2
  lockedUser = false
  constructor(public router: Router, public userService:UserService,public adminService:AdminService,public employee_service:EmployeeService) {
    sessionStorage.clear()
   }

  ngOnInit(): void {
  }

  signUp() {
    this.router.navigate(["signup"])
  }

  signiInUser(userInfo:any) {
    console.log(userInfo)

    let resp = this.userService.getUserByUsername(userInfo.userName)
    resp.subscribe( (response:any) =>{
      let user_details = response['user'][0]
      console.log(user_details)
      if(user_details == undefined){
        alert("Account wasn't found! Try again")
      }else{
          this.userService.signInUser(userInfo).subscribe(result=>{
            console.log(result)
            if (result.status) {
              sessionStorage.setItem("userName", userInfo.userName)
              this.router.navigate(["user"])
            }else{
              alert("Issue with Employee credentials")
            }
          });
         
      }
      
    })
  }

  signiInEmployee(employeeInfo:any) {
    console.log(employeeInfo)

    this.employee_service.sendCredentials(employeeInfo)
    .subscribe((res:any) =>{
      if(res.status){
        sessionStorage.setItem("id",employeeInfo['id'])
        this.employee_service.getEmployee(employeeInfo.id).subscribe(result => {
          console.log(result.data[0].changedPassword)
          if(result.data[0].changedPassword) {
            this.router.navigate(["employee"])
            sessionStorage.setItem("employee", employeeInfo.id)
          } else {
            let newPassword = prompt("New Password: ")
            if(newPassword != null && newPassword != "") {
              let conform = prompt("Conform Password: ")
              if (conform == newPassword) {
                let employeeObj = {
                  password: conform,
                  changedPassword: true
                }
                console.log(employeeObj)
                this.employee_service.passwordChanged(employeeObj, employeeInfo.id).subscribe(result => {
                  this.router.navigate(["employee"])
                  sessionStorage.setItem("employee", employeeInfo.id)
                })
              }
            }
          }
        })
      }else{
        alert("Issue with Employee credentials")
      }
    })
    
  }

  signiInAdmin(adminInfo:any) {
    console.log(adminInfo)
    this.adminService.sendCredentials(adminInfo).subscribe(result=>{
      console.log(result)
      if(result.status){
        this.router.navigate(["admin"])
      }else{
        alert(result.message)
      }
    })
  }
}
