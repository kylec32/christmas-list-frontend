import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdInputModule, MdSnackBarModule, MdListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationService } from './services/authentication.service';
import { LinkerService } from './services/linker.service';
import { loginReducer } from './reducers/authentication.reducer';
import { ChristmasListComponent } from './christmas-list/christmas-list.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'list', component: ChristmasListComponent },
  { path: '**', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChristmasListComponent
  ],
  imports: [RouterModule.forRoot(
      appRoutes
      //,{ enableTracing: true } // <-- debugging purposes only
    ),
    StoreModule.forRoot({ loginReducer }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdSnackBarModule,
    MdListModule
  ],
  providers: [AuthenticationService, LinkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
