import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CountriesComponent } from '../content/countries/countries.component';
import {RouterModule} from '@angular/router';
import { routes } from '../../shared/shared';
import { PopupMenuComponent } from '../menus/popup-menu/popup-menu.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './signin-user/signin-user.component';
@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    FormsModule
    
    
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
    CountriesComponent,
    PopupMenuComponent,
    SignInComponent
    
  ],
  providers:[
    FrameworkConfigService,
    IconServiceProvider,
    ScreenService,
    MenuService
  ],
  exports:[
    FrameworkComponent
  ]
})
export class FrameworkModule { }
