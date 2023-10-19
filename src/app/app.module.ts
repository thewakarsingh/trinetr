import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import {AngularMaterialModule} from '../material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './my_components/header/header.component';
import { HomeComponent } from './my_components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
//import { NgxsModule } from '@ngxs/store';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';


import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatButtonToggleModule} from '@angular/material/button-toggle';

import { MapComponent } from './my_components/map/map.component';
import { MatComponent } from './my_components/mat/mat.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
import { SupportFunctions } from './my_components/map/supportFiles';
import { RegistrationComponent } from './my_components/registration/registration.component';
import { AllowTrackingComponent } from './my_components/allow-tracking/allow-tracking.component';
import { TrackerComponent } from './my_components/tracker/tracker.component';
import { AddPersonComponent } from './my_components/add-person/add-person.component';

import { DeviceCardComponent } from './my_components/device-card/device-card.component';
import { AboutComponent } from './my_components/about/about.component';
import { LoginComponent } from './my_components/login/login.component';
import { LoadingScreenComponent } from './my_components/loading-screen/loading-screen.component';
import { NoInternetComponent } from './my_components/no-internet/no-internet.component';
import { NeedHelpComponent } from './my_components/need-help/need-help.component';
import { GobackComponent } from './my_components/goback/goback.component';
import { InstructionsComponent } from './my_components/instructions/instructions.component';
import { PrivacyPolicyComponent } from './my_components/privacy-policy/privacy-policy.component';
import { NotificationComponent } from './my_components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MapComponent,
    MatComponent,
    RegistrationComponent,
    AllowTrackingComponent,
    TrackerComponent,
    InstructionsComponent,
    AddPersonComponent,
    DeviceCardComponent,
    AboutComponent,
    LoginComponent,
    LoadingScreenComponent,
    NoInternetComponent,
    NeedHelpComponent,
    GobackComponent,
    PrivacyPolicyComponent,
    NotificationComponent,

    
  
  ],
  imports: [
    AngularMaterialModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonToggleModule,
    HttpClientModule,
    ReactiveFormsModule, BrowserAnimationsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTabsModule,

   AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

  
],
  providers: [DatePipe,SupportFunctions],
  bootstrap: [AppComponent]
})
export class AppModule { }
