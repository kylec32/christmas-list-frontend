import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdSnackBar } from '@angular/material';

import { FOLLOWING_LOADED, FOLLOWEE_DELETE } from '../reducers/authentication.reducer';

import { LinkerService } from '../services/linker.service';

@Component({
  selector: 'app-christmas-list',
  templateUrl: './christmas-list.component.html',
  styleUrls: ['./christmas-list.component.css']
})
export class ChristmasListComponent implements OnInit {

  newFollowEmail:String = "";
  following:any[] = [];
  token:String = "";

  constructor(private store: Store<any>, private linkerService: LinkerService, private snakBar: MdSnackBar) { }

  ngOnInit() {
    this.store.select('loginReducer').subscribe((success) => {
      this.token = success.token;
      //this.loadFollowing();
    }, (error) => {
      console.log("Error");
      console.log(error);
    });
    
    this.loadFollowing();

    this.store.select('loginReducer').subscribe((state) => {
      this.following = state.following;
      console.log("Reducer");
      console.log(this.following);
    }, (error) => {
      console.log(error);
    })
  }

  loadFollowing() {
    this.linkerService.getFollowed(this.token)
        .subscribe((following) => {
          console.log("Service");
          console.log(following);
          this.store.dispatch({type: FOLLOWING_LOADED, payload: {following: following}});
        }, (err) => {
          this.snakBar.open('Issue Getting Following List', null, {
            duration: 2000,
          });
        });
  }

  removeFollower(followee) {
    this.linkerService.disconnectFollowee(this.token, followee.ID)
        .subscribe((removeResult) => {
          this.snakBar.open(`Successfully disconnected from: ${followee.userName}`
                              , null
                              , { duration: 2000 });
          this.store.dispatch({type: FOLLOWEE_DELETE, payload: {toDelete: followee}});
          this.loadFollowing();
        }, (error) => {
          this.snakBar.open(`Issue dissconnecting from: ${followee.userName}`, null, {
            duration: 2000,
          });
        });
  }

  followNew() {
    const email = this.newFollowEmail;
    this.linkerService.followNew(this.token, email)
          .subscribe((addResult) => {
            this.snakBar.open(`Successfully added: ${email}`
            , null
            , { duration: 2000 });

            this.loadFollowing();

            this.store.dispatch({type: "FOLLOWING_ADD"});
          }, (error) => {
            this.snakBar.open(`Couldn't find account for: ${email}`, null, {
              duration: 2000,
            });
          });
    this.newFollowEmail = "";
  }

  followersEmpty():boolean {
    return typeof(this.following) == "undefined" || this.following.length == 0;
  }

}
