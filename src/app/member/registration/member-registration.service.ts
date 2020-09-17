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
        
        /* return new Observable((observer) => {
            this.firestore
            .collection("member_registration")
            //.where('emailId', '!=', member.emailId)
            .add(member).then((doc) => {
              observer.next({
                key: doc.id,
              });
            });
          });*/
          return new Observable((observer) => {
            var memberRef = this.firestore
              .collection("member_registration").doc('emailId');
              var setWithMerge = memberRef.set({
                title: member.title,
                firstName: member.firstName,
                lastName: member.lastName,
                address: member.address,
                area: member.area,
                pincode: member.pincode,
                mobileNo: member.mobileNo,
                emailid: member.emailId,
                dtOfBirth: member.dtOfBirth,
                profession: member.profession,
                gender: member.gender,
                isMarried: member.isMarried,
                spouseName: member.spouseName,
                familyCount: member.familyCount,
                photo: "",
                dtOfRegistration: new Date(),
                isMember: 'No',
                isPaid: 'No',
                paidAmount: 0,
                startDate: '',
                expiryDate: '',
                memberId: '',
                password:'',
                isActive: false
            }, { merge: true }).then((doc) => {
              observer.next({
                key: doc,
              });
          });
        })
      }   
}