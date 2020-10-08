import { MemberService } from './../member.service';
import { Router, NavigationExtras } from '@angular/router';
import { MemberRegistration } from './../../model/registration.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.scss']
})
export class ViewMemberComponent implements OnInit {
  members: MemberRegistration[] = []; 
  constructor( 
    private memberService: MemberService,
    private router: Router
    ) { }
  private sorted = false;
  ngOnInit(): void {
    this.memberService.getAllmembers().subscribe(  
      (users: MemberRegistration[]) => {  
        this.members = users;  
        console.log("Members = ", this.members);  
      }  
    );  
  }


  sortBy(by: string | any): void {

    this.members.sort((a: any, b: any) => {
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

  viewMemberDetail(member:MemberRegistration) {
    this.router.navigate(['member/memberDetail'], {state: member});
  }

  editMemberDetail(member:MemberRegistration) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "emailId": member.emailid
      }
  };
    this.router.navigate(['member/editRegistration/'], navigationExtras);
  }

}
