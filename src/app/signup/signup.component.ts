import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailAddress: String = "";
  password: String = "";
  passwordAgain: String = "";

  constructor(private _router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  canSignUp(): boolean {
    return this.emailAddress.length > 0 && this.password.length > 0 && this.passwordAgain === this.password;
  }

  backToLogin() {
    this._router.navigate(['/login']);
  }

}
