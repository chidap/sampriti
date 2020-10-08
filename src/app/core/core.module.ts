import { ContactService } from './../admin/contact.service';
import { ViewContactUsComponent } from './../admin/contact-us/view-contact-us.component';
import { MemberDetailComponent } from './../admin/member-detail/member-detail.component';
import { ViewMemberComponent } from './../admin/view-member/view-member.component';
import { EditRegistrationComponent } from './../admin/edit-registration/edit-registration.component';
import { ViewUserDetailComponent } from './../admin/view-user-detail/view-user-detail.component';
import { ViewRegistrationComponent } from './../admin/view-registration/view-registration.component';
import { MemberService } from './../admin/member.service';
//import { AuthService } from './auth.service';
import { CoreRoutingModule } from './core-routing.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { ManageExpenseComponent } from '../admin/manage-expense/manage-expense.component';


@NgModule({
  declarations: [
    LoginComponent,
    ViewRegistrationComponent,
    ViewUserDetailComponent,
    EditRegistrationComponent,
    ViewMemberComponent,
    MemberDetailComponent,
    ViewContactUsComponent,
    ManageExpenseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    AngularFireAuthModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  providers:[
    MemberService,
    ContactService
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
})
export class CoreModule { }
