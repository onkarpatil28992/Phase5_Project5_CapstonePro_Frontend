import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserSignupComponent} from './user-signup/user-signup.component'
import {LoginComponent} from './login/login.component'
import {UserComponent} from './user/user.component'
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import {AdminComponent} from './admin/admin.component'
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"signup", component:UserSignupComponent},
  {path:"user", component:UserComponent},
  {path:"editProfile",component:EditProfileComponent},
  {path:"admin",component:AdminComponent},
  {path:"employee",component:EmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
