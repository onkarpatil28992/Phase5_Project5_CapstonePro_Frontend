import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

  accountNumber?:Number;
  curr_funds?:Number;

  constructor(public user_service:UserService) { }

  ngOnInit(): void {

    let curr_userName:any = sessionStorage.getItem('userName')
    let resp = this.user_service.getUserByUsername(curr_userName)
    resp.subscribe( (response:any) =>{
      let user_details = response['user'][0]
      console.log(user_details)
      this.curr_funds = user_details['funds']
      this.accountNumber = user_details['accountNumber']
    })
  }

  addFunds(fundsAmnt:any){
    let fundsInput:any = document.getElementById('fundsInput')
    fundsInput.value = ""

    console.log("Here are the inputted funds:")
    console.log(fundsAmnt)
  
    if (fundsAmnt > 0) {
      let curr_userName:any = sessionStorage.getItem('userName')
      let funds_info = {
        userName:curr_userName,
        funds:fundsAmnt
      }
  
      this.user_service.addFunds(funds_info)
      .subscribe((res:any)=>{
        let user_details = res['user']
        console.log(user_details)
        this.curr_funds = user_details['funds']
        alert("Funds have been updated")
      })
    } else {
      alert("Can't deduct from funds")
    }

  }

}
