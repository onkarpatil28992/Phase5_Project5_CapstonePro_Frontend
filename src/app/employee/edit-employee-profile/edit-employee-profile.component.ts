import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-edit-employee-profile',
  templateUrl: './edit-employee-profile.component.html',
  styleUrls: ['./edit-employee-profile.component.css']
})
export class EditEmployeeProfileComponent implements OnInit {

  password1Res?:string
  password2Res?:string

  constructor(public employee_service:EmployeeService) { }

  ngOnInit(): void {
  }

  submitNewPassword(updatePasswordRef:any){
    let a:any = document.getElementById('f_currPassword')
    let b:any = document.getElementById('f_newPassword1')
    let c:any = document.getElementById('f_newPassword2')

    a.value = ""
    b.value = ""
    c.value = ""

    console.log(updatePasswordRef)

    let emp_id:any  = sessionStorage.getItem('id')

    // We need to retrieve the employee password
    let resp = this.employee_service.getEmployeeById({"id":emp_id})
    resp.subscribe((response:any)=>{
      let employee_details = response['data'][0]
      console.log("here are the details")
      console.log(employee_details)
      
      if(updatePasswordRef['f_newPassword1'] != updatePasswordRef['f_newPassword2']){
        console.log("ok")
        this.password1Res = "❌ Password didn't match!"
        this.password2Res = "❌ Password didn't match!"
      }else{
        if(updatePasswordRef['f_currPassword'] == employee_details['password']){
          console.log("Match!")
          let update_details = {
            id:emp_id,
            password:updatePasswordRef['f_newPassword1']
          }

          // Send PUT request for password change
          this.employee_service.updatePassword(update_details)
          .subscribe((res:any)=>{
            if(res.status){
              alert("Your password has been successfully changed!")
            }else{
              alert("Password could not be changed! Try again!")
            }
          })
        }
      }
    })    
  }

}
