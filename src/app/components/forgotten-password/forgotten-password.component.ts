import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  password: string;
  passwordConfirm: string;
  emailAddress: string;
  private token: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private snakBar: MatSnackBar) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.emailAddress = params['email'];
      this.token = params['token'];
    });
  }

  allowReset(): boolean {
    return this.password != undefined
            && this.password.length > 0
            && this.passwordConfirm == this.password
  }

  reset(): void {
    this.authenticationService.resetPassword(this.password, this.token)
      .subscribe(_ => {
        this.snakBar.open("Password reset");
        this.router.navigate(['/']);
      });
  }

}
