import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../core/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
    })
  }

  onLogout() {
    this.authService.SignOut();
  }

}
