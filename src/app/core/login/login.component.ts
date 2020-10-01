import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  disabledSubmitButton: boolean = true; 
  public signInFailed: boolean;
  public userAuth: Subscription;

  @HostListener('input') oninput() {

    if (this.loginForm.valid) {
      this.disabledSubmitButton = false;
    }
  }


  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService
    ) { 
      this.signInFailed = false;
      this.loginForm = this.fb.group({
        'emailId': ['', Validators.required],
        'pwd': ['', Validators.required]
      });

      /*this.userAuth = this.authService.signIn.then((user) => {
        if (user) this.router.navigate([ 'tasks' ]);
    });*/
    }

  ngOnInit(): void {
    
  }

  get emailId() {
    return this.loginForm.get('emailId');
  }

  get pwd() {
    return this.loginForm.get('pwd');
  }

  onSubmit(fg: FormGroup) {
    try {
      this.signInFailed = false;
      if (!fg.valid) throw new Error('Invalid sign-in credentials');
      const result = this.authService.signIn(fg.value.emailID, fg.value.pwd);
      console.log('that tickles', result);
      if (result) this.router.navigate([ 'tasks' ]);
      else throw new Error('Sign-in failed');
  } catch (error) {
      console.log(error);
      this.signInFailed = true;
  }
  }

  reSet() {
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }

}
