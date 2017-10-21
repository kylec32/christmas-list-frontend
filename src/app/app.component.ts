import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN, LOGOUT } from './reducers/authentication.reducer';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loggedIn: boolean = false;

  constructor(private store: Store<any>,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    if(localStorage.getItem('token') != undefined) {
      this.store.dispatch({type: LOGIN, payload: {token: localStorage.getItem('token')}});
    }

    this.store.select('token').subscribe((success) => {
      this.loggedIn = success != null;
    }, (error) => {
      console.log("Error");
      console.log(error);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
