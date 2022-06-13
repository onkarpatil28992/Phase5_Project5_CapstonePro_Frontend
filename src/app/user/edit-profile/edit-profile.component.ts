import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { User } from '../../model.user'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user_firstName?:string;
  user_lastName?:string;
  user_address?:string;
  user_email?:string;
  user_dob?:string;
  user_phoneNumber?:string;

  password1Res?:string
  password2Res?:string 

  constructor(public user_service:UserService) { }

  ngOnInit(): void {

    let curr_userName:any = sessionStorage.getItem('userName')
    let resp = this.user_service.getUserByUsername(curr_userName)
    resp.subscribe( (response:any) =>{
      let user_details = response['user'][0]
      console.log(user_details)

      this.user_firstName = user_details['firstName']
      this.user_lastName = user_details['lastName']
      this.user_address = user_details['userAddress']
      this.user_email = user_details['email']
      this.user_dob = user_details['dod']
      this.user_phoneNumber = user_details['phoneNumber']
    })


  }

  submitEdits(editProfileRef:any){
    let fname:any = document.getElementById('f_fname')
    let lname:any = document.getElementById('f_lname')
    let email:any = document.getElementById('f_email')
    let address:any = document.getElementById('f_address')
    let dob:any = document.getElementById('f_dob')
    let phoneNum:any = document.getElementById('f_phoneNum')

    fname.value = ""
    lname.value = ""
    email.value = ""
    address.value = ""
    dob.value = ""
    phoneNum.value = ""  

    // Grab the currently logged in username from sessionStorage
    let curr_userName:any = sessionStorage.getItem('userName')
    let emailCheck = true
    editProfileRef['userName'] = curr_userName
    
    let final_UserEdits:any = {}
    for(let [k,v] of Object.entries(editProfileRef)){
      console.log(k)
      if(v != ""){
        if (k == "email") {
          if (this.user_service.regexp.test(editProfileRef.email)) {
            final_UserEdits[k] = v
          } else {
            emailCheck = false
            break
          }
        } else {
          final_UserEdits[k] = v
        }
      }
    }
    console.log(final_UserEdits)
    if (emailCheck){
      this.user_service.updateProfile(final_UserEdits)
      alert("Profile has been updated")
    } else {
      alert("Invalid email")
    }
  }

  submitNewPassword(updatePasswordRef:any){
    console.log(updatePasswordRef)

    let curr_userName:any = sessionStorage.getItem('userName')
    let resp = this.user_service.getUserByUsername(curr_userName)
    resp.subscribe( (response:any) =>{
      let user_details = response['user'][0]
      console.log(user_details)

      if(updatePasswordRef['f_newPassword1'] != updatePasswordRef['f_newPassword2']){
        this.password1Res = "❌ Password didn't match!"
        this.password2Res = "❌ Password didn't match!"
      }else{
        if(updatePasswordRef['f_currPassword'] == user_details['password']){
          console.log("Match!")
          // prep data to be changed
          let update_details = {
            userName:curr_userName,
            password:updatePasswordRef['f_newPassword1']
          }

          // Send PUT request for password change
          this.user_service.updatePassword(update_details)
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
