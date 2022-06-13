import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/model.ticket';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-unlock-users',
  templateUrl: './unlock-users.component.html',
  styleUrls: ['./unlock-users.component.css']
})
export class UnlockUsersComponent implements OnInit {

  tickets:Data[] = []

  constructor(public user_service:UserService) {
    this.user_service.getTickets().subscribe(result => {
      this.tickets = result.data
    })
   }

  ngOnInit(): void {
  }

  unLockUser(userName:any){
    let obj = {
      userName: userName,
      locked: false
    }
    this.user_service.updateProfile(obj)
    this.user_service.deleteTicket(userName).subscribe(res => {
      this.user_service.getTickets().subscribe(result => {
        this.tickets = result.data
      })
    })
  }

}
