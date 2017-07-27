import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { ScheduleComponent } from './page/schedule/schedule.component';




import { LoginModule } from './page/login/login.module';
import { HomeModule } from './page/home/home.module';
import { SignupModule } from './page/signup/signup.module';
import { ScheduleModule } from './page/schedule/schedule.module';


import { AppComponent } from './app.component';

import * as firebase from 'firebase';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0RNVuWNJcvqEZAqwudFcVeqxbT2Vp-KI",
    authDomain: "bookyourvet-6ab87.firebaseapp.com",
    databaseURL: "https://bookyourvet-6ab87.firebaseio.com",
    projectId: "bookyourvet-6ab87",
    storageBucket: "bookyourvet-6ab87.appspot.com",
    messagingSenderId: "416942615461"
  };
  firebase.initializeApp(config);



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ScheduleComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes,{useHash: true}),
    LoginModule,
    HomeModule,
    SignupModule,
    ScheduleModule,
   
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {   

}
