import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from './../model/contact.model';

@Injectable()
export class ContactService {
    contactCollection: AngularFirestoreCollection<Contact>;
    contactUs: Observable<Contact[]>;   
    constructor( 
        private firestore: AngularFirestore        
      ) {
      this.contactCollection = this.firestore.collection('contact_us', x => x.orderBy('dtOfSubmit', 'asc'));
      //this.memberCollection = this.firestore.collection('member_details', x => x.orderBy('firstName', 'asc'));
    }
    
    
    getAllContacts() {
      this.contactUs = this.contactCollection.snapshotChanges().pipe(map(  
        (changes) => {  
          //console.log("userList = ", changes);
          return changes.map(  
            a => {  
              const data = a.payload.doc.data() as Contact;  
                
              return data;  
            });  
        })); 
        return this.contactUs; 
    }
}