import { MemberRegistration } from './../../model/registration.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  member: MemberRegistration;
  constructor() { }

  ngOnInit(): void {
    this.member = history.state;
    console.log("user = ", this.member);
  }

  editRegistration() {
    
  }

}
