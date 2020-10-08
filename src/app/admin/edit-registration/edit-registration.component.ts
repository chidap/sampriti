import { MemberService } from './../member.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MemberRegistration } from './../../model/registration.model';
import { MemberRegistrationService } from './../../member/registration/member-registration.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { MDBDatePickerComponent, IMyOptions } from 'ng-uikit-pro-standard';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.scss']
})
export class EditRegistrationComponent implements OnInit {
  emailId: string;
  regdUser:any;
  user$: any;
  msg: any;
  registrationForm: FormGroup;
  titleSelect: Array<any>;
  roleSelect: Array<any>;
  familycountSelect: Array<any>;
  memberData: MemberRegistration;

  @ViewChild('datePicker', { static: true }) datePicker: MDBDatePickerComponent;
  
  public myDatePickerOptions: IMyOptions = {
    minYear: 1930,
    maxYear: 2021
  }

  constructor(
    private memberService: MemberService,
    private registrationService: MemberRegistrationService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastService
  ) { 
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
    this.roleSelect = [
      { value: 'member', label: 'Member'},
      { value: 'admin', label: 'Admin'},
      { value: 'superadmin', label: 'Super Admin'},
      
    ];
    this.loadControls();

  }

  ngOnInit(): void {
   //this.loadControls();

    this.router.queryParams.subscribe(params => {
      this.emailId = params["emailId"]; 
    });

    
      /*this.registrationService.getRegistrationById(this.emailId)
          .subscribe(data => {
            console.log("regUser0000 = ", data);
              if (data) {
                this.regdUser = data
                console.log("regUser0000 = ", this.regdUser);
              } else {
                console.log("regUser11111 = ", this.regdUser);
              }
            }, error => {
              console.log(error);
            });*/
     this.user$ = this.registrationService.getUserByEmail(this.emailId)
      .pipe(
            tap(user => {
                if (user) {
                  this.msg = 'success';
                  console.log(this.msg);
                } else {
                  this.msg = 'User with this email does not exist!';
                }
            }));

      this.user$.subscribe((data) => {
        
        this.regdUser =  data;
        console.log("user2222 = ", this.regdUser);
        this.f.title.setValue(data.title);
        this.f.firstName.setValue(data.firstName);
        this.f.lastName.setValue(data.lastName);
        this.f.address.setValue(data.address);
        this.f.area.setValue(data.area);
        this.f.pincode.setValue(data.pincode);
        this.f.mobileNo.setValue(data.mobileNo);
        this.f.emailid.setValue(data.emailid);
        this.f.dtOfBirth.setValue(data.dtOfBirth);
        this.f.profession.setValue(data.profession);
        this.f["gender"].setValue(data.gender);
        console.log("gender = ", data.gender)
        this.f.isMarried.setValue(data.isMarried);
        this.f.spouseName.setValue(data.spouseName);
        this.f.familyCount.setValue(data.familyCount);
      });
  }

  get f() { return this.registrationForm.controls; }

  loadControls() {
    
    this.registrationForm = this.fb.group({
      'title': new FormControl({value: '', disabled: false}, [Validators.required]),  
      'firstName': new FormControl({value: '', disabled: false}, [Validators.required]),
      'lastName': new FormControl({value: '', disabled: false}, [Validators.required]),
      'address': new FormControl({value: '', disabled: false}, [Validators.required]),
      'area': new FormControl({value: '', disabled: false}, [Validators.required]),
      'pincode': new FormControl({value: '', disabled: false}, [ Validators.required, Validators.minLength(6), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]),
      'mobileNo': new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(10),Validators.maxLength(12),Validators.pattern('^[0-9]*$')]),
      'emailid': new FormControl({value: '', disabled: false}, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'dtOfBirth': new FormControl({value: '', disabled: false}, [Validators.required]),
      'profession': new FormControl({value: '', disabled: false}, []),
      'gender': new FormControl('', [Validators.required]),
      'isMarried': new FormControl({value: '', disabled: false}),
      'spouseName': new FormControl({value: '', disabled: false}, []),
      'familyCount': new FormControl({value: '', disabled: false}, []),
      'isPaid': new FormControl('', [Validators.required]),
      'paidAmount': new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(5),Validators.pattern('^[0-9]*$')]),
      'startDate': new FormControl('', [Validators.required]),
      'expiryDate': new FormControl('', [Validators.required]),
      'photo': new FormControl('', ),
      'isActive': new FormControl(''),
      'role': new FormControl('', [Validators.required]),
      'memberId': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
    });
  }

  get input() {
    return this.registrationForm.get('email');
  }

  get input2() {
        return this.registrationForm.get('required');
  }
  
  reset() {
    console.log('Updated Data = ', this.registrationForm.value);
  }

  onSubmit() {
    if ( this.registrationForm.valid ) {
      this.memberData = this.registrationForm.value;
      const options = { toastClass: 'opacity' };
      this.memberService.addMember(this.memberData)
          .subscribe((res) => {
            console.log(this.registrationForm.value);
            this.toastr.success('Membership Details Updated successfully!','', options);
            this.registrationForm.reset();
          }, error => {
              this.toastr.error(error, '', options);
          });
      
    }

  }
    
}
