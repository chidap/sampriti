import { ManageExpenseComponent } from './../admin/manage-expense/manage-expense.component';
import { ViewContactUsComponent } from './../admin/contact-us/view-contact-us.component';
import { MemberDetailComponent } from './../admin/member-detail/member-detail.component';
import { ViewMemberComponent } from './../admin/view-member/view-member.component';
import { EditRegistrationComponent } from './../admin/edit-registration/edit-registration.component';
import { ViewUserDetailComponent } from './../admin/view-user-detail/view-user-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ViewRegistrationComponent } from './../admin/view-registration/view-registration.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'viewRegistration', component: ViewRegistrationComponent },
  { path: 'viewregdetail', component: ViewUserDetailComponent },
  { path: 'editRegistration', component: EditRegistrationComponent },
  { path: 'viewMembers', component: ViewMemberComponent },
  { path: 'memberDetail', component: MemberDetailComponent },
  { path: 'viewContact', component: ViewContactUsComponent },
  { path: 'addExpense', component: ManageExpenseComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }