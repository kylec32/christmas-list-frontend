import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { WishListModule } from './wish-list/wish-list.module';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthenticationService } from './services/authentication.service';
import { MyPresentsService } from './services/mypresents.service';
import { PresentService } from './services/presents.service';
import { AnalyticsService } from './services/analytics.service';
import { token } from './reducers/authentication.reducer';
import { following } from './reducers/connection.reducer';
import { mypresents } from './reducers/mypresents.reducer';
import { presents } from './reducers/present.reducer';
import { ChristmasListComponent } from './components/christmas-list/christmas-list.component';

import { CanActivateViaAuthGuard } from './services/authenticated.guard';
import { AddAuthenticationHeaderInterceptor } from './services/injector/add-auth-header.service';
import { LogOutWithUnauthroized } from './services/injector/logged-out-handler.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ToolbarWrapperComponent } from './components/toolbar-wrapper/toolbar-wrapper.component';
import { AppRoutingModule } from './routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChristmasListComponent,
    ForgottenPasswordComponent,
    WelcomeComponent,
    ToolbarWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RecaptchaModule.forRoot(),
    SharedModule,
    WishListModule
  ],
  providers: [AuthenticationService,
              MyPresentsService,
              PresentService,
              AnalyticsService,
              CanActivateViaAuthGuard,
              MatDialogModule,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: AddAuthenticationHeaderInterceptor,
                multi: true
              },
              {
                provide: HTTP_INTERCEPTORS,
                useClass: LogOutWithUnauthroized,
                multi: true
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
