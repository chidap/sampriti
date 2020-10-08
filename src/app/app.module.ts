import { AuthService } from './core/auth.service';
import { TeamComponent } from './static/team/team.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { AgmCoreModule } from '@agm/core';
import { ToastModule  } from 'ng-uikit-pro-standard';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { environment } from "src/environments/environment";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { BannerComponent } from './home/banner/banner.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './member/registration/registration.component';
import { EventCalendarComponent } from './static/event-calendar/event-calendar.component';
import { HoneContent1Component } from './static/hone-content1/hone-content1.component';
import { HomeContent2Component } from './static/home-content2/home-content2.component';
import { HomeContent3Component } from './static/home-content3/home-content3.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { AboutUsComponent } from './static/about-us/about-us.component';
import { ContactUsComponent } from './static/contact-us/contact-us.component';
import { PujaUpdateComponent } from './static/puja-update/puja-update.component';
//import { ViewRegistrationComponent } from './admin/view-registration/view-registration.component';
//import { ViewUserDetailComponent } from './admin/view-user-detail/view-user-detail.component';
//import { EditRegistrationComponent } from './admin/edit-registration/edit-registration.component';
//import { ViewMemberComponent } from './admin/view-member/view-member.component';
//import { MemberDetailComponent } from './admin/member-detail/member-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    HomeComponent,
    RegistrationComponent,
    EventCalendarComponent,
    HoneContent1Component,
    HomeContent2Component,
    HomeContent3Component,
    FooterComponent,
    AboutUsComponent,
    TeamComponent,
    ContactUsComponent,
    PujaUpdateComponent,
    
    
   
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp( environment.firebaseConfig ),
    AngularFireFunctionsModule,
   /* AgmCoreModule.forRoot({
      apiKey: 'GOOGLE MAPS API KEY'
    }),*///
    ToastModule.forRoot({
      timeOut: 3500,
      positionClass: 'md-toast-top-center',
      preventDuplicates: true,
    }),
    MDBBootstrapModulesPro.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MDBSpinningPreloader,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
