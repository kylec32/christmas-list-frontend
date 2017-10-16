import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { FOLLOWING_LOADED, FOLLOWEE_DELETE } from '../reducers/connection.reducer';

import { LinkerService } from '../services/linker.service';
import { MyPresentsService } from '../services/mypresents.service';

@Component({
  selector: 'app-christmas-list',
  templateUrl: './christmas-list.component.html',
  styleUrls: ['./christmas-list.component.css']
})
export class ChristmasListComponent implements OnInit {

  newFollowEmail:String = "";
  following:any[] = [];
  token:String = "";
  myPresents:Observable<Array<any>>

  constructor(private store: Store<any>,
              private linkerService: LinkerService,
              private snakBar: MdSnackBar,
              private myPresentsService: MyPresentsService) { 
                  this.myPresents = this.myPresentsService.myPresents;
              }

  ngOnInit() {
    this.store.select('token').subscribe((token) => {
      this.token = token;
      //this.loadFollowing();
    }, (error) => {
      console.log("Error");
      console.log(error);
    });
    
    this.loadFollowing();
    this.myPresentsService.loadMyPresents(this.token);

    this.store.select('following').subscribe((following) => {
      this.following = following;
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
