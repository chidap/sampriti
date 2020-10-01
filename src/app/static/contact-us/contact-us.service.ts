import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from './../../model/contact.model';

@Injectable({
    providedIn: "root"
})
export class ContactUsService {
    contact: Contact;
    constructor( private firestore: AngularFirestore ) {}

    
    addContact(contact): Observable<any> {
        
        return new Observable((observer) => {
            this.firestore
            .collection("contact_us")
            //.where('emailId', '!=', member.emailId)
            .add(contact).then((doc) => {
              observer.next({
                key: doc.id,
              });
            });
          });

          
        }      
}