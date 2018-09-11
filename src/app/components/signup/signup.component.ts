import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN } from '../../reducers/authentication.reducer';
import { MatSnackBar } from '@angular/material';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailAddress: String = "";
  password: String = "";
  passwordAgain: String = "";
  firstName:String = "";
  lastName:String = "";

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar,
              private store: Store<any>) { }

  ngOnInit() {
  }

  canSignUp(): boolean {
    return this.firstName.length > 0
            && this.lastName.length > 0
            && this.emailAddress.length > 0
            && this.password.length > 0
            && this.passwordAgain === this.password;
  }

  signUp():void {
    this.snackBar.open('Signing Up', null, {
      duration: 2000,
    });
    this.authenticationService.signUp(this.firstName, this.lastName, this.emailAddress, this.password)
        .subscribe(response => {
          this.authenticationService.login(this.emailAddress, this.password)
            .subscribe(loginResponse => {
              this.store.dispatch({type: LOGIN, payload: {token: loginResponse.token}});
              this.snackBar.open('Logged In', null, {
                duration: 2000,
              });
              this.router.navigate(['/list']);
            });
        },
        error => {
          this.snackBar.open(`User Already Exists: ${this.emailAddress}`, null, { duration: 2000});
        });
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

  private clearForm(): void {
    this.firstName = "";
    this.lastName = "";
    this.emailAddress = "";
    this.password = "";
    this.passwordAgain = "";
  }

}
