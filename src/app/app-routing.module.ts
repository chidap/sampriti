import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';import { AboutUsComponent } from './static/about-us/about-us.component';

import { ContactUsComponent } from './static/contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { PujaUpdateComponent } from './static/puja-update/puja-update.component';
import { TeamComponent } from './static/team/team.component';
import { EventCalendarComponent } from './static/event-calendar/event-calendar.component';
//import { LoginComponent } from  './Authentication/login/login.component';
import { RegistrationComponent } from './member/registration/registration.component';

//import { MemberComponent } from './member/member.component';
const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "aboutus", component: AboutUsComponent },
    { path: "contact", component: ContactUsComponent },
    { path: "team", component: TeamComponent },
    { path: "events", component: EventCalendarComponent },
    { path: "registration", component: RegistrationComponent },
    { path: "update", component: PujaUpdateComponent},
    { path: "login", loadChildren: () => import(`./core/core.module`).then(m => m.CoreModule) } ,
    { path: '**', redirectTo: ''}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}