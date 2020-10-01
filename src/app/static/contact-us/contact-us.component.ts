import { Component,  HostListener , OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ContactUsService } from './contact-us.service';
import { Contact } from './../../model/contact.model';
import { ToastService } from 'ng-uikit-pro-standard';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  disabledSubmitButton: boolean = true; 
  contact: Contact;
  
  @HostListener('input') oninput() {

    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(
    private fb: FormBuilder, 
    private fun: AngularFireFunctions,
    private contactUsService: ContactUsService,
    private toastr: ToastService
    ) {
    this.contactForm = fb.group({
      'contactFormName': ['', Validators.required],
      'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
      'contactFormMobile': ['', Validators.compose([Validators.required])],
      'contactFormSubject': ['', Validators.required],
      'contactFormMessage': ['', Validators.required],
      
    });

   }

  ngOnInit(): void {
  }

  get name() {
    return this.contactForm.get('contactFormName');
  }
  get email() {
    return this.contactForm.get('contactFormEmail');
  }
  get mobile() {
    return this.contactForm.get('contactFormMobile');
  }
  get subject() {
    return this.contactForm.get('contactFormSubject');
  }
  get message() {
    return this.contactForm.get('contactFormMessage');
  }

  onSubmit(value: any) {
    this.contact = { 
      'name': value.contactFormName, 
      'email' : value.contactFormEmail,
      'mobile': value.contactFormMobile,
      'subject': value.contactFormSubject,
      'message': value.contactFormMessage,
    };
    
    const options = { toastClass: 'opacity' };
    this.contactUsService.addContact(this.contact)
          .subscribe((res) => {
            this.toastr.success('Registration request Submitted successfully!','', options);
            this.contactForm.reset();
          }, error => {
              this.toastr.error(error, '', options);
          });
    //const callable = this.fun.httpsCallable('genericEmail');
    //callable({ text: value.contactFormMessage, subject: value.contactFormSubject }).subscribe();
  }

  reSet() {
    console.log(this.contactForm.value);
    this.contactForm.reset();
  }
  

}
