import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { FrameworkModule } from '../pages/framework/framework.module';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
import { RouterModule } from '@angular/router';
import { routes } from '../shared/shared';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticatedUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FrameworkModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
