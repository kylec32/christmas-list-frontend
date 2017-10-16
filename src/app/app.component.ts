import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { LOGOUT } from './reducers/authentication.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loggedIn: boolean = false;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.select('token').subscribe((success) => {
      this.loggedIn = success != null;
    }, (error) => {
      console.log("Error");
      console.log(error);
    });
  }

  logout() {
    this.store.dispatch({type: LOGOUT});
  }
}
