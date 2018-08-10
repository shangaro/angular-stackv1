
import {Routes, Route } from '@angular/router';
import { DashBoardComponent } from '../pages/content/dashboard/dashboard.component';
import { AuthenticatedUserComponent } from '../app/authenticated-user/authenticated-user.component';
import { SignInComponent } from '../pages/framework/signin-user/signin-user.component';
import { DeviceConfigurationComponent } from '../pages/content/device-configuration/device-configuration.component';
import { ListViewComponent } from '../pages/content/listview/listview.component';
import { SettingsComponent } from '../pages/content/settings/settings.components';
import { UploadScheduleFormComponent } from '../pages/forms/upload-schedule-form/upload-schedule-form.component';
import { IridiumModeFormComponent } from '../pages/forms/remote-configuration-form/iridium-mode-form/iridium-mode-form.component';
import { IridiumPositionTransmissionFormComponent } from '../pages/forms/remote-configuration-form/iridium-position-transmission/iridium-position-transmission-form.component';
import { MortalityAndHibernationFormComponent } from '../pages/forms/remote-configuration-form/mortality-and-hibernation-form/mortality-and-hibernation-form.component';
import { TriggerDropOffReleaseFormComponent } from '../pages/forms/remote-configuration-form/trigger-drop-off-form/trigger-dropoff-release-form.component';


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
                        {path:'send-gps-schedule',component:UploadScheduleFormComponent},
                        {path:'send-vhf-schedule',component:UploadScheduleFormComponent},
                        {path:'send-proximity-gps-schedule',component:UploadScheduleFormComponent},
                        {path:'clear-proximity-gps-schedule',component:UploadScheduleFormComponent},
                        {path:'send-iridium-schedule',component:UploadScheduleFormComponent},
                        {path:'clear-iridium-schedule',component:UploadScheduleFormComponent},
                        {path:'send-proximity-schedule',component:UploadScheduleFormComponent},
                        {path:'send-activity-schedule',component:UploadScheduleFormComponent},
                        {path: '**', component:DeviceConfigurationComponent}
                    
                    ]
                },
                {
                    path:'remote-configuration',
                    children:[
                        { path:'configure-iridium-mode',component:IridiumModeFormComponent},
                        { path:'iridium-position-transmission',component:IridiumPositionTransmissionFormComponent},
                        { path:'mortality-and-hibernation',component:MortalityAndHibernationFormComponent},
                        { path:'trigger-drop-off-release',component:TriggerDropOffReleaseFormComponent}

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



