import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './static/team/team.component';
import { EventCalendarComponent } from './static/event-calendar/event-calendar.component';
import { RegistrationComponent } from './member/registration/registration.component';

//import { MemberComponent } from './member/member.component';
const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "team", component: TeamComponent },
    { path: "events", component: EventCalendarComponent },
    { path: "registration", component: RegistrationComponent },
    { path: '**', redirectTo: ''}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}