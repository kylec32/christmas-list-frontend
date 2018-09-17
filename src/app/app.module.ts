import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatListModule, MatDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthenticationService } from './services/authentication.service';
import { LinkerService } from './services/linker.service';
import { MyPresentsService } from './services/mypresents.service';
import { PresentService } from './services/presents.service';
import { token } from './reducers/authentication.reducer';
import { following } from './reducers/connection.reducer';
import { mypresents } from './reducers/mypresents.reducer';
import { presents } from './reducers/present.reducer';
import { ChristmasListComponent } from './components/christmas-list/christmas-list.component';
import { SaveEditPresentDialogComponent } from './components/save-edit-present-dialog/save-edit-present-dialog.component';

import { CanActivateViaAuthGuard } from './services/authenticated.guard';
import { AddAuthenticationHeaderInterceptor } from './services/injector/add-auth-header.service';
import { LogOutWithUnauthroized } from './services/injector/logged-out-handler.service';
import { MyPresentsListComponent } from './components/my-presents-list/my-presents-list.component';

import { RecaptchaModule } from 'ng-recaptcha';

import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'list',
    component: ChristmasListComponent, 
    canActivate: [CanActivateViaAuthGuard]
  },
  { path: '**', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChristmasListComponent,
    SaveEditPresentDialogComponent,
    MyPresentsListComponent
  ],
  entryComponents: [
    SaveEditPresentDialogComponent
  ],
  imports: [RouterModule.forRoot(
      appRoutes
      //,{ enableTracing: true } // <-- debugging purposes only
    ),
    StoreModule.forRoot({ token, following, mypresents, presents }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production,
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    RecaptchaModule.forRoot()
  ],
  providers: [AuthenticationService,
              LinkerService,
              MyPresentsService,
              PresentService,
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
