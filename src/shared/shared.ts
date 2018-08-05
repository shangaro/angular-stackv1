
import {Routes, Route } from '@angular/router';
import { DashBoardComponent } from '../pages/content/dashboard/dashboard.component';
import { AuthenticatedUserComponent } from '../app/authenticated-user/authenticated-user.component';
import { SignInComponent } from '../pages/framework/signin-user/signin-user.component';
import { DeviceConfigurationComponent } from '../pages/content/device-configuration/device-configuration.component';
import { ListViewComponent } from '../pages/content/listview/listview.component';
import { SettingsComponent } from '../pages/content/settings/settings.components';
import { UploadTableComponent } from '../pages/tables/upload-table/upload-table.component';
import { PanelRouterComponent } from '../pages/framework/panel-router-destination/panel-router.component';


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
            path:'listview',
            component:ListViewComponent
    
        },
        {
            path:'device-configuration',
            component:DeviceConfigurationComponent,
            children:[
                {
                    path:'scheduling',
                    children:[
                        {path:'',redirectTo:'device-configuration',pathMatch:'full'},
                        {path:'send-gps-schedule',component:UploadTableComponent},
                        {path:'send-vhf-schedule',component:UploadTableComponent},
                        {path:'send-proximity-gps-schedule',component:UploadTableComponent},
                        {path:'clear-proximity-gps-schedule',component:UploadTableComponent},
                        {path:'send-iridium-schedule',component:UploadTableComponent},
                        {path:'clear-iridium-schedule',component:UploadTableComponent},
                        {path:'send-proximity-schedule',component:UploadTableComponent},
                        {path:'send-activity-schedule',component:UploadTableComponent},
                        {path: '**', component:DeviceConfigurationComponent}
                    
                    ]
                }
            ]
        },
        {
            path:'settings',
            component:SettingsComponent
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



