import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FrameworkComponent } from './framework.component';
import { ContentComponent } from '../content/content.component';
import { HeaderComponent } from '../header/header.component';
import { FrameworkConfigService } from '../../services/FrameworkConfig';
import { FooterComponent } from '../footer/footer.component';
import { IconServiceProvider } from '../../services/icon.service';
import { ScreenService } from '../../services/screen.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScreenLarge } from '../../directives/screen-large.directive';
import { ScreenBelowLarge } from '../../directives/screen-small.directive';
import { MenuService } from '../../services/menu.service';
import { MenuComponent } from '../menus/menu/menu.component';
import { MenuItemComponent } from '../menus/menu-item/menu-item.component';
import { SocialIconBarsComponent } from '../footer/socialIcon-bar/socialIcons-bar.component';
import { TopBarComponent } from '../header/topbar/topbar.component';
import { DashBoardComponent } from '../content/dashboard/dashboard.component';
import { SettingsComponent } from '../content/settings/settings.components';
import {RouterModule} from '@angular/router';
import { routes } from '../../shared/shared';
import { PopupMenuComponent } from '../menus/popup-menu/popup-menu.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './signin-user/signin-user.component';
import {MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,MatSelectModule, MatDatepickerModule, MatProgressSpinnerModule} from '@angular/material';
import {NoopAnimationsModule, BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MapDataTableComponent } from '../tables/mapDataTable/mapDataTable.component';
import {AgmCoreModule} from '@agm/core';
import { MapWidgetComponent } from '../widgets/map-widgets/map-widget.component';
import {ButtonModule, ButtonGroupModule} from '@progress/kendo-angular-buttons';
import { DateInputsModule, DateInputComponent } from '@progress/kendo-angular-dateinputs';
import { DatePickerComponent } from '../widgets/datepicker/datepicker.component';
import { GridModule, PDFModule,ExcelModule } from '@progress/kendo-angular-grid';
import {InputsModule} from '@progress/kendo-angular-inputs'
import { DeviceConfigurationComponent } from '../content/device-configuration/device-configuration.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { UploadInterceptor } from '../../interceptors/upload.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UploadModule } from '@progress/kendo-angular-upload';
import { DeviceConfigService } from '../../services/device-config.service';
import { IDeviceConfigService } from '../../shared/class-interface/idevice-config.service';
import { ListViewComponent } from '../content/listview/listview.component';
import { ListViewTableComponent } from '../tables/listview-table/listview-table.component';
import { PanelRouterComponent } from './panel-router-destination/panel-router.component';
import { SingleColumnTableComponent } from '../tables/singlecolumn-table/singlecolumn-table.component';
import { UploadScheduleFormComponent } from '../forms/upload-schedule-form/upload-schedule-form.component';
import { IridiumModeFormComponent } from '../forms/remote-configuration-form/iridium-mode-form/iridium-mode-form.component';
import { IridiumPositionTransmissionFormComponent } from '../forms/remote-configuration-form/iridium-position-transmission/iridium-position-transmission-form.component';
import { MortalityAndHibernationFormComponent } from '../forms/remote-configuration-form/mortality-and-hibernation-form/mortality-and-hibernation-form.component';
import { TriggerDropOffReleaseFormComponent } from '../forms/remote-configuration-form/trigger-drop-off-form/trigger-dropoff-release-form.component';
import { JqSliderComponent } from '../widgets/jqslider/jqslider.component';
@NgModule({
  imports: [
    FontAwesomeModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    AgmCoreModule.forRoot({apiKey:'AIzaSyBvxVP2-G5Z-yP-D-KAPIOqr8nrPDderzw'}),
    ButtonModule,
    ButtonGroupModule,
    DateInputsModule,
    GridModule,
    PDFModule,ExcelModule,
    DropDownsModule,
    LayoutModule,
    MatProgressSpinnerModule,
    UploadModule,
    InputsModule    
  
  ],
  declarations: [
    FrameworkComponent,
    ContentComponent,
    HeaderComponent,
    TopBarComponent,
    SocialIconBarsComponent,
    FooterComponent,
    ScreenLarge,
    ScreenBelowLarge,
    MenuComponent,
    MenuItemComponent,
    DashBoardComponent,
    SettingsComponent,
    PopupMenuComponent,
    SignInComponent,
    MapDataTableComponent,
    ListViewTableComponent,
    MapWidgetComponent,
    DatePickerComponent,
    DeviceConfigurationComponent,
    SingleColumnTableComponent,
    ListViewComponent,
    PanelRouterComponent,
    UploadScheduleFormComponent,
    IridiumModeFormComponent,
    IridiumPositionTransmissionFormComponent,
    MortalityAndHibernationFormComponent,
    TriggerDropOffReleaseFormComponent,
    JqSliderComponent
  ],
  providers: [
    FrameworkConfigService,
    IconServiceProvider,
    ScreenService,
    MenuService,
    DeviceConfigService,
    {
      provide:HTTP_INTERCEPTORS, useClass:UploadInterceptor,multi:true
    },
    {
      provide:IDeviceConfigService, useExisting:DeviceConfigService
    },
   

  ],
  exports: [
    FrameworkComponent
  ]
})
export class FrameworkModule { }
