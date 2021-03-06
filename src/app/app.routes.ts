import { Routes } from '@angular/router';


import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { ScheduleComponent } from './page/schedule/schedule.component';


import { SignupRoutes } from './page/signup/index';
import { HomeRoutes } from './page/home/index';
import { LoginRoutes } from './page/login/index';
import { ScheduleRoutes } from './page/schedule/index';




export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
    	path: 'login',
    	component: LoginComponent
  	},
    {
    	path: 'home',
    	component: HomeComponent
  	},
    {
    	path: 'signup',
    	component: SignupComponent
  	},
    {
    	path: 'schedule',
    	component: ScheduleComponent
  	},
    
    ...SignupRoutes,
    ...HomeRoutes,
    ...LoginRoutes,
    ...ScheduleRoutes,
  
    
];