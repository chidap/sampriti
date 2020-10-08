import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberRegistration } from './../../model/registration.model';

@Injectable({
    providedIn: "root"
})
export class MemberRegistrationService {
    memberRegistration: MemberRegistration;
    regdUsers: Observable<MemberRegistration[]>;
    //regdUser: Observable<MemberRegistration>;
    registrationCollection: AngularFirestoreCollection<MemberRegistration>;
    constructor( private firestore: AngularFirestore ) {
      this.registrationCollection = this.firestore.collection('member_registration', x => x.orderBy('firstName', 'asc'));
    }

    
    addRegistration(member): Observable<any> {
        return new Observable((observer) => {
            var memberRef = this.firestore
              .collection("member_registration").doc(member.emailId);
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

    getAllRegistrations() {
      this.regdUsers = this.registrationCollection.snapshotChanges().pipe(map(  
        (changes) => {  
          //console.log("userList = ", changes);
          return changes.map(  
            a => {  
              const data = a.payload.doc.data() as MemberRegistration;  
              data.id = a.payload.doc.id;  
              return data;  
            });  
        })); 
        return this.regdUsers; 
    }

    getAllUserRegistrations() {
      const regdUsers = this.firestore.collection('member_registration', ref => ref
          .where('isMember', '==', 'No'))
          .valueChanges();
      return regdUsers;
    }


    getRegistrationById(emailId: string){
      const regdUser = this.firestore.collection('member_registration', ref => ref
          .where('emailid', '==', emailId))
          .valueChanges();
      return regdUser;
    }

    getUserByEmail(email: string): Observable<MemberRegistration> {
      const collection = this.firestore.collection<MemberRegistration>('member_registration', ref => ref.where('emailid', '==', email))
      const user$ = collection
        .valueChanges()
        .pipe(
          map(users => {
            const user = users[0];
            console.log("hdshhf", user);
            return user;
          })
        );
      
      return user$;
      }

}
