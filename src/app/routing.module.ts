import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ToolbarWrapperComponent } from './components/toolbar-wrapper/toolbar-wrapper.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { ChristmasListComponent } from './components/christmas-list/christmas-list.component';
import { CanActivateViaAuthGuard } from './services/authenticated.guard';

const appRoutes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: '', component: ToolbarWrapperComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset/:email/:token', component: ForgottenPasswordComponent },
      { path: 'list',
        component: ChristmasListComponent, 
        canActivate: [CanActivateViaAuthGuard]
      }
    ]},
    { path: '**', component: WelcomeComponent}
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

