import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { FrameworkModule } from '../pages/framework/framework.module';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
import { RouterModule } from '@angular/router';
import { routes } from '../shared/shared';
import { UserService } from './user.service';
import { UserApi } from '../shared/class-interface/userApi';
import {MatMomentDateModule } from '../../node_modules/@angular/material-moment-adapter';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';





@NgModule({
  declarations: [
    AppComponent,
    AuthenticatedUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FrameworkModule,
    RouterModule.forChild(routes),
    MatMomentDateModule,
    PDFExportModule,
    BrowserAnimationsModule,
    ButtonsModule,
    DateInputsModule
  ],
  providers: [
    UserService,
    {provide:UserApi,useExisting:UserService} // Dependency Injection in angular uses class-interface
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
