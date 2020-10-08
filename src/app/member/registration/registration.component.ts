import { MemberRegistration } from './../../model/registration.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MemberRegistrationService } from './member-registration.service';
import { MDBDatePickerComponent, IMyOptions } from 'ng-uikit-pro-standard';
import { ToastService } from 'ng-uikit-pro-standard';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  titleSelect: Array<any>;
  familycountSelect: Array<any>;
  regData: MemberRegistration;
  
  @ViewChild('datePicker', { static: true }) datePicker: MDBDatePickerComponent;
  public myDatePickerOptions: IMyOptions = {
    minYear: 1930,
    maxYear: 2021
  }
  constructor(
    private fb: FormBuilder,
    private registrationService: MemberRegistrationService,
    private toastr: ToastService
  ) {}
  
  ngOnInit() {
    this.titleSelect = [
      { value: 'Mr.', label: 'Mr.'},
      { value: 'Mrs.', label: 'Mrs.'},
      { value: 'Ms.', label: 'Ms.'},
      { value: 'Dr.', label: 'Dr.'}
    ];

    this.familycountSelect = [
      { value: '1', label: '1'},
      { value: '2', label: '2'},
      { value: '3', label: '3'},
      { value: '4', label: '4'}
    ];
      this.registrationForm = this.fb.group({
        'title': ['', [Validators.required]],  
        'firstName': ['', [Validators.required]],
        'lastName': ['', [Validators.required]],
        'address': ['', [Validators.required]],
        'area': ['', [Validators.required]],
        'pincode': ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
        'mobileNo': ['', [Validators.required, Validators.minLength(10),Validators.maxLength(12),Validators.pattern('^[0-9]*$')]],
        'emailId': ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        'dtOfBirth': ['', [Validators.required]],
        'profession': ['', []],
        'gender': ['', [Validators.required]],
        'isMarried': [''],
        'spouseName': [{value: '', disabled: true}, []],
        'familyCount': [{value: '', disabled: true}, []],
      });
  }

  get input() {
      return this.registrationForm.get('email');
  }

  get input2() {
      return this.registrationForm.get('required');
  }

  onSubmit() {
    if ( this.registrationForm.valid) {
      this.regData = this.registrationForm.value;
      const options = { toastClass: 'opacity' };
      this.registrationService.addRegistration(this.regData)
          .subscribe((res) => {
            console.log(this.registrationForm.value);
            this.toastr.success('Registration request Submitted successfully!','', options);
            this.registrationForm.reset();
          }, error => {
              this.toastr.error(error, '', options);
          });
      
    }
  
  }

  reset() {
    //this.registrationForm.reset();
    console.log(this.registrationForm.value);
  }

  enableSpouse(event: Event) {
    const ctrl1 = this.registrationForm.get('spouseName');
    const ctrl2 = this.registrationForm.get('familyCount');
    if(!this.registrationForm.controls['isMarried'].value == true) {
      ctrl1.enable();
      ctrl2.enable();
    }
    else {
      ctrl1.disable();
      ctrl2.disable();
    }
    
  }
}
