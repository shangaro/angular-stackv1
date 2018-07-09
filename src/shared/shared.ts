
import {Routes } from '@angular/router';
import { DashBoardComponent } from '../pages/content/dashboard/dashboard.component';
import { SettingsComponent } from '../pages/content/settings/settings.components';
import { CountriesComponent } from '../pages/content/countries/countries.component';
import { AuthenticatedUserComponent } from '../app/authenticated-user/authenticated-user.component';
import { SignInComponent } from '../pages/framework/signin-user/signin-user.component';

export const  routes:Routes=[
 {
     path:'signin',component:SignInComponent},
 {
     path:'authenticated', component:AuthenticatedUserComponent,
    children:[
        {
            path:'dashboard',
            component:DashBoardComponent
        },
        {
            path:'settings',
            component:SettingsComponent
    
        },
        {
            path:'countries',
            component:CountriesComponent
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