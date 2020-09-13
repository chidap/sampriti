import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberRegistration } from './../../model/registration.model';

@Injectable({
    providedIn: "root"
})
export class MemberRegistrationService {
    memberRegistration: MemberRegistration;
    constructor( private firestore: AngularFirestore ) {}

    
    addRegistration(member): Observable<any> {
        /*return new Promise<any>((resolve, reject) => {
          this.firestore
            .collection("member_registration")
            .add(member);
            //.then(res => {}, err => reject(err));
        });*/

        return new Observable((observer) => {
            this.firestore
            .collection("member_registration")
            .add(member).then((doc) => {
              observer.next({
                key: doc.id,
              });
            });
          });
      }
}