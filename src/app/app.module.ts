import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdInputModule, MdSnackBarModule, MdListModule, MdDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import { MyPresentsListComponent } from './components/my-presents-list/my-presents-list.component';

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
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdSnackBarModule,
    MdListModule,
    MdDialogModule
  ],
  providers: [AuthenticationService,
              LinkerService,
              MyPresentsService,
              PresentService,
              CanActivateViaAuthGuard,
              MdDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
