import { AuthService } from './auth.service';
import { CoreRoutingModule } from './core-routing.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuthModule } from "@angular/fire/auth";
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    AngularFireAuthModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  providers:[
    AuthService
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
})
export class CoreModule { }
