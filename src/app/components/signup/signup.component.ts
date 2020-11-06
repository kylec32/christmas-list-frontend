import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN } from '../../reducers/authentication.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from '../../services/authentication.service';
import { RecaptchaComponent } from 'ng-recaptcha';

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
  private captchaResponse: string = "";
  @ViewChild("captchaRef", { static: true }) captchaRef: RecaptchaComponent;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar,
              private store: Store<any>) { }

  ngOnInit() {
    this.captchaRef.reset();
  }

  canSignUp(): boolean {
    return this.firstName.length > 0
            && this.lastName.length > 0
            && this.emailAddress.length > 0
            && this.password.length > 0
            && this.passwordAgain === this.password
            && this.captchaResponse.length > 0;
  }

  signUp():void {
    this.snackBar.open('Signing Up', null, {
      duration: 2000,
    });
    this.authenticationService.signUp(this.firstName, this.lastName, this.emailAddress, this.password, this.captchaResponse)
        .subscribe(response => {
          this.snackBar.open('Setting Up Your account...', null, {
            duration: 5000,
          });
          setTimeout(() => {
            this.authenticationService.login(this.emailAddress, this.password)
              .subscribe(loginResponse => {
                this.store.dispatch({type: LOGIN, payload: {token: loginResponse.token}});
                this.snackBar.open('Logged In', null, {
                  duration: 2000,
                });
                this.router.navigate(['/list']);
              });
          }, 5000);
          
        },
        error => {
          this.snackBar.open(`User Already Exists: ${this.emailAddress}`, null, { duration: 2000});
        });
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

  resolved(captchaResponse: string) {
    console.log(captchaResponse);
    this.captchaResponse = captchaResponse;
  }

  private clearForm(): void {
    this.captchaRef.reset();
    this.firstName = "";
    this.lastName = "";
    this.emailAddress = "";
    this.password = "";
    this.passwordAgain = "";
  }

}
