import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN } from '../../reducers/authentication.reducer';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-toolbar-wrapper',
  templateUrl: './toolbar-wrapper.component.html',
  styleUrls: ['./toolbar-wrapper.component.css']
})
export class ToolbarWrapperComponent implements OnInit {
  loggedIn: boolean = false;
  currentYear: Number = 2019

  constructor(private store: Store<any>,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    if(localStorage.getItem('token') != undefined) {
      this.store.dispatch({type: LOGIN, payload: {token: localStorage.getItem('token')}});
    }

    this.currentYear = (new Date()).getFullYear()

    this.store.select('token').subscribe((success) => {
      this.loggedIn = success != null;
    }, (error) => {
      console.log("Error");
      console.log(error);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
