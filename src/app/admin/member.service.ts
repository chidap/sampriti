import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberRegistration } from './../model/registration.model';

@Injectable()
export class MemberService {
    memberRegistration: MemberRegistration;
    regdUsers: Observable<MemberRegistration[]>;
    //regdUser: Observable<MemberRegistration>;
    registrationCollection: AngularFirestoreCollection<MemberRegistration>;
    //memberCollection: AngularFirestoreCollection<MemberRegistration>;
    constructor( 
        private firestore: AngularFirestore,
        private auth: AngularFireAuth 
      ) {
      this.registrationCollection = this.firestore.collection('member_details', x => x.orderBy('firstName', 'asc'));
      //this.memberCollection = this.firestore.collection('member_details', x => x.orderBy('firstName', 'asc'));
    }

    
    addMember(member): Observable<any> {
        return new Observable((observer) => {
            var memberRef = this.firestore
              .collection("member_details").doc(member.emailid);
              var setWithMerge = memberRef.set({
                title: member.title,
                firstName: member.firstName,
                lastName: member.lastName,
                address: member.address,
                area: member.area,
                pincode: member.pincode,
                mobileNo: member.mobileNo,
                emailid: member.emailid,
                dtOfBirth: member.dtOfBirth,
                profession: member.profession,
                gender: member.gender,
                isMarried: member.isMarried,
                spouseName: member.spouseName,
                familyCount: member.familyCount,
                photo: "",
                dtOfRegistration: "",
                isMember: "",
                isPaid: member.isPaid,
                paidAmount: member.paidAmount,
                startDate: member.startDate,
                expiryDate: member.expiryDate,
                role: member.role,
                memberId: member.memberId,
                password:"",
                isActive: member.isActive
            }, { merge: true }).then((doc) => {
              observer.next({
                key: doc,
              });
          });
          this.addSignUp(member.emailid, member.password);
          let doc = this.firestore.collection('member_registration', ref => ref.where('emailid', '==', member.emailid));
          doc.snapshotChanges().subscribe((res: any) => {
              let id = res[0].payload.doc.id;
              this.firestore.collection('member_registration').doc(id).update({isMember: "Yes"});
          });


        })
      }
      
      
    addSignUp(email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password)
          .then((result) => {
            console.log("You have been successfully registered!");
            console.log(result.user)
          }).catch((error) => {
            window.alert(error.message)
          })
      }  

    getAllmembers() {
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
            return user;
          })
        );
      
      return user$;
      }

}