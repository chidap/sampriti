import { Router, NavigationExtras } from '@angular/router';
import { MemberRegistrationService } from './../../member/registration/member-registration.service';
import { MemberRegistration } from './../../model/registration.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.scss']
})
export class ViewRegistrationComponent implements OnInit {
  regdUsers: MemberRegistration[] = []; 
  constructor( 
    private registrationService: MemberRegistrationService,
    private router: Router
    ) { }
  private sorted = false;
  ngOnInit(): void {
    this.registrationService.getAllUserRegistrations().subscribe(  
      (users: MemberRegistration[]) => {  
        this.regdUsers = users;  
        console.log("Registered users = ", this.regdUsers);  
      }  
    );  
  }


  sortBy(by: string | any): void {

    this.regdUsers.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }

  viewRegistrationDetail(user:MemberRegistration) {
    this.router.navigate(['member/viewregdetail'], {state: user});
  }

  editRegistrationDetail(user:MemberRegistration) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "emailId": user.emailid
      }
  };
    this.router.navigate(['member/editRegistration/'], navigationExtras);
  }

}
