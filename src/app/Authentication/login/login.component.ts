import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validatingForm: FormGroup;

  
  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    /*this.validatingForm = new FormGroup({
      modalFormLoginEmail: new FormControl('', Validators.email),
      modalFormLoginPassword: new FormControl('', Validators.required),
    }); */
    
    this.validatingForm = this.fb.group({
      'modalFormLoginEmail': ['', [Validators.required]],  
      'modalFormLoginPassword': ['', [Validators.required]],
    });
  }

}
