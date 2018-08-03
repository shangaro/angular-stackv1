
import {Routes } from '@angular/router';
import { DashBoardComponent } from '../pages/content/dashboard/dashboard.component';
import { SettingsComponent } from '../pages/content/settings/settings.components';
import { AuthenticatedUserComponent } from '../app/authenticated-user/authenticated-user.component';
import { SignInComponent } from '../pages/framework/signin-user/signin-user.component';
import { DeviceConfigurationComponent } from '../pages/content/device-configuration/device-configuration.component';


export const  routes:Routes=[
 {
     path:'signin',component:SignInComponent},
 {
     path:'authenticated', component:AuthenticatedUserComponent,
    children:[
        {
            path:'',redirectTo:'dashboard',pathMatch:'full'
        },
        {
            path:'dashboard',
            component:DashBoardComponent
        },
        {
            path:'settings',
            component:SettingsComponent
    
        },
        {
            path:'device-configuration',
            component:DeviceConfigurationComponent
        }
    ]
 },
 {
     path: '',component:SignInComponent
 },
 {
     path: '**', component:SignInComponent
 }
];
