
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './my_components/header/header.component';
import { AddPersonComponent } from './my_components/add-person/add-person.component';
import { AllowTrackingComponent } from './my_components/allow-tracking/allow-tracking.component';
import { AboutComponent } from './my_components/about/about.component';
import { RegistrationComponent } from './my_components/registration/registration.component';
import { TrackerComponent } from './my_components/tracker/tracker.component';
import { InstructionsComponent } from './my_components/instructions/instructions.component';
import { NeedHelpComponent } from './my_components/need-help/need-help.component';
import { PrivacyPolicyComponent } from './my_components/privacy-policy/privacy-policy.component';
import { NotificationComponent } from './my_components/notification/notification.component';

const routes: Routes = [



  //{ path: 'login', loadChildren: () => import('./my_components/registration/registration.component').then(m => RegistrationComponent) },

  
  {path: 'home', component:HeaderComponent, 
    children:[{path:'tracker',component:TrackerComponent}]},

    {path: 'home', component:HeaderComponent,
    children:[{ path:'addperson',component:AddPersonComponent}]},

    {path: 'home', component:HeaderComponent,
    children:[{ path:'track',component:AllowTrackingComponent}]},

    {path: 'home', component:HeaderComponent, 
    children:[{path:'about',component:AboutComponent}]},

    {path: 'home', component:HeaderComponent, 
    children:[{path:'privacy_policy',component:PrivacyPolicyComponent}]},

    {path: 'home', component:HeaderComponent, 
    children:[{path:'need_help',component:NeedHelpComponent}]},
    


    {path: 'home', component:HeaderComponent, 
    children:[{path:'notification',component:NotificationComponent}]},

    {path: 'home', component:HeaderComponent, 
    children:[{path:'instructions',component:InstructionsComponent}]},



{path:'privacy_policy', component:PrivacyPolicyComponent},

{path:'sw.js', component:PrivacyPolicyComponent},



{path:'', component:RegistrationComponent},
{path:'login', component:RegistrationComponent, },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
