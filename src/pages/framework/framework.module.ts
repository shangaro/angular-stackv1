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
import {MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,MatSelectModule, MatDatepickerModule} from '@angular/material';
import {NoopAnimationsModule, BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MapDataTableComponent } from '../tables/mapDataTable.component';
import {AgmCoreModule} from '@agm/core';
import { SettingsTableComponent } from '../tables/settings-table/settings-table.component';
import { MapWidgetComponent } from '../widgets/map-widgets/map-widget.component';
import {ButtonModule, ButtonGroupModule} from '@progress/kendo-angular-buttons';
import { DateInputsModule, DateInputComponent } from '@progress/kendo-angular-dateinputs';
import { DatePickerComponent } from '../widgets/datepicker/datepicker.component';
import { GridModule, PDFModule,ExcelModule } from '../../../node_modules/@progress/kendo-angular-grid';
import { DeviceConfigurationComponent } from '../content/device-configuration/device-configuration.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
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
    DropDownsModule

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
    SettingsTableComponent,
    MapWidgetComponent,
    DatePickerComponent,
    DeviceConfigurationComponent
  ],
  providers: [
    FrameworkConfigService,
    IconServiceProvider,
    ScreenService,
    MenuService
  ],
  exports: [
    FrameworkComponent
  ]
})
export class FrameworkModule { }
