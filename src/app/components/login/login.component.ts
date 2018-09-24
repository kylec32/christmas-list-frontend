import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN } from '../../reducers/authentication.reducer';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private snakBar: MatSnackBar, private _router: Router, private store: Store<any>, private authenticationService: AuthenticationService) { 
    this.email = "";
    this.password = "";
  }

  ngOnInit() {
    if(this.authenticationService.isLoggedIn()) {
      this._router.navigate(['/list']);
    }
  }

  signUp(){
    this._router.navigate(['/signup']);
  }

  login(){
    this.snakBar.open('Logging In', null, {
      duration: 2000,
    });
    this.authenticationService.login(this.email, this.password)
        .subscribe((loginResult) => {
          if(loginResult.found) {
            this.store.dispatch({type: LOGIN, payload: {token: loginResult.token}});
            this.snakBar.open('Logged In', null, {
              duration: 2000,
            });
            this._router.navigate(['/list']);
          } else {
            console.log("Invalid login");
            this.snakBar.open('Invalid Credentials', null, {
              duration: 2000,
            });
          }
          
          this.clearForm();
        }, (error) => {
          console.error(error);
          this.snakBar.open('Invalid Credentials', null, {
            duration: 2000,
          });
          this.clearForm();
        })
  }

  forgottenPassword(): void {
    if(this.email == undefined || this.email.length == 0) {
      this.snakBar.open('Please enter an email address before clicking forgotten password.',
                        null,
                        { duration: 1500 });
    } else {
      this.authenticationService.forgottenPassword(this.email)
            .subscribe(value => 
              this.snakBar.open('Please check your email for password reset link.',
                        null,
                        { duration: 1500 })
              );
      
    }
  }

  allowSignIn(): boolean {
    return this.email != 'undefined' && this.email.length > 0 && this.password != 'undefined' && this.password.length > 0;
  }

  private clearForm() {
    this.email = '';
    this.password = '';
  }

}
