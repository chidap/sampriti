import { MemberRegistration } from './../../model/registration.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-user-detail',
  templateUrl: './view-user-detail.component.html',
  styleUrls: ['./view-user-detail.component.scss']
})
export class ViewUserDetailComponent implements OnInit {
  user: MemberRegistration;
  constructor() { }

  ngOnInit(): void {
    this.user = history.state;
    console.log("user = ", this.user);
  }

  editRegistration() {
    
  }

}
