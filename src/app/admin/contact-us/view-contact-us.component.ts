import { Contact } from './../../model/contact.model';
import { ContactService } from './../../admin/contact.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './view-contact-us.component.html',
  styleUrls: ['./view-contact-us.component.scss']
})
export class ViewContactUsComponent implements OnInit {
  contacts: Contact[] = []; 
  constructor( 
    private contactService: ContactService,
    private router: Router
    ) { }
  private sorted = false;
  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(  
      (conatcts: Contact[]) => {  
        this.contacts = conatcts;  
        console.log("Members = ", this.contacts);  
      }  
    );  
  }


  sortBy(by: string | any): void {

    this.contacts.sort((a: any, b: any) => {
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

  deleteContact(contact:Contact) {
    this.router.navigate(['member/memberDetail'], {state: contact});
  }

  
}
