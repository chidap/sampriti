import { Injectable,NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../model/user.model';
import { MemberRegistration } from '../model/registration.model';

@Injectable()
export class AuthService {
  userData: User;
  user$: any;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private eventAuthError = new BehaviorSubject<string>("");
  private eventUserData =  new BehaviorSubject<any>({});
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone 
    ) { 
       this.afAuth.authState.subscribe(user => {
        if (user) {
          this.eventUserData.subscribe(data => {
            this.userData = data;
            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user'));
            this.loggedIn.next(true);
          }, error=> {

          }, ()=> {
            if(this.userData.email == '' ) {
              this.router.navigate(['member']);
            }
            console.log('done');
          });
        } else {
            
            localStorage.setItem('user', null);
            JSON.parse(localStorage.getItem('user'));
            this.loggedIn.next(false);
            this.router.navigate(['member']);
        }
      })
      }

  
     // Sign in with email/password
     signIn(email, password) {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['member/viewRegistration']);
          });
          this.setUserData(result.user);
          this.loggedIn.next(true);
          /*console.log("mmmmmmmm");  
          var myLocalStorage = JSON.parse(localStorage.getItem('user'));
          console.log("mmmmmmmm", this.userData.role); 
          myLocalStorage[0].role = this.userData.role;
          console.log("mmmmmmmm", myLocalStorage[0]);
          localStorage.setItem('user',JSON.stringify(myLocalStorage[0]));
          JSON.parse(localStorage.getItem('user'));*/
        }).catch((error) => {
          this.eventAuthError.next(error);
        });
    }

    // Returns true when user is looged in and email is verified
  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null ) {
      this.loggedIn.next(true);
    }else {
      this.loggedIn.next(false);
    }

    return this.loggedIn.asObservable();
  }

   // Sign out 
   SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.router.navigate(['member']);
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    /*const memberRef: AngularFirestoreDocument<any> = this.afs.doc(`member_registration/${user.email}`);
    const member$ = memberRef.valueChanges().pipe( map(users => {
      const user = users;
      return user
    }));
    member$.subscribe((data: MemberRegistration) => {
      console.log("memberref1111 = ", data);
    });*/
    const collection = this.afs.collection<MemberRegistration>('member_details', ref => ref.where('emailid', '==', user.email))
    console.log("memberref = ", collection);
    this.user$ = collection
          .valueChanges()
          .pipe(
            map( users => {
            
            const member = users[0];
            console.log("memberref = ", member);
            const userData: User = {
              id: user.uid,
              email: member.emailid,
              role: member.role
            }
            this.userData = userData;           
            userRef.set(userData, {
              merge: true
            });
            this.eventUserData.next(userData);
            return userRef;
          }));
      this.user$.subscribe((data) => {
              this.userData = data;
          });

          
    
  }

  
}
