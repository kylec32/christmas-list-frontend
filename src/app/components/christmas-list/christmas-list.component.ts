import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { FOLLOWING_LOADED, FOLLOWEE_DELETE, FOLLOWING_ADD } from '../../reducers/connection.reducer';

import { LinkerService } from '../../services/linker.service';
import { PresentService } from '../../services/presents.service';
import { Follower } from '../../wish-list/interfaces/follower';

@Component({
  selector: 'app-christmas-list',
  templateUrl: './christmas-list.component.html',
  styleUrls: ['./christmas-list.component.css']
})
export class ChristmasListComponent implements OnInit {

  following:any[] = [];
  token:String = "";
  followerPresents:Observable<Array<any>>;

  constructor(private store: Store<any>,
              private linkerService: LinkerService,
              private snakBar: MatSnackBar,
              private presentService: PresentService) { 
                  this.followerPresents = this.presentService.otherPresents;
              }

  ngOnInit() {  
    this.loadFollowing();

    this.store.select('following').subscribe((following) => {
      this.following = following;
    }, (error) => {
      console.log(error);
    })
  }

  connectWithFollower(follower: Follower) {
    this.store.dispatch({type: FOLLOWING_ADD, payload:{"name": follower.userName}});
    this.linkerService.followNew(this.token, follower.userName)
          .subscribe((addResult) => {
            this.snakBar.open(`Successfully added: ${follower.userName}`
            , null
            , { duration: 2000 });

            setTimeout(() => this.loadFollowing(), 1000);
          }, (error) => {
            this.loadFollowing();
            this.snakBar.open(`Couldn't find account for: ${follower.userName}`, null, {
              duration: 2000,
            });
          });
  }

  loadFollowing() {
    this.linkerService.getFollowed(this.token)
        .subscribe((following) => {
          this.store.dispatch({type: FOLLOWING_LOADED, payload: {following: following.followees}});
        }, (err) => {
          this.snakBar.open('Issue Getting Following List', null, {
            duration: 2000,
          });
        });
  }

  removeFollower(followee) {
    this.store.dispatch({type: FOLLOWEE_DELETE, payload: {toDelete: followee}});
    this.linkerService.disconnectFollowee(this.token, followee.id)
        .subscribe((removeResult) => {
          this.snakBar.open(`Successfully disconnected from: ${followee.name}`
                              , null
                              , { duration: 2000 });
          setTimeout(() => this.loadFollowing(), 1000);
        }, (error) => {
          this.loadFollowing();
          this.snakBar.open(`Issue dissconnecting from: ${followee.name}`, null, {
            duration: 2000,
          });
        });
  }

  followersEmpty():boolean {
    return typeof(this.following) == "undefined" || this.following.length == 0;
  }

  markAsPurchased(targetUsrId:string, presentId: string):void {
    this.presentService.markAsPurchased(targetUsrId, presentId);
  }

  unmarkAsPurchased(targetUsrId:string, presentId: string):void {
    this.presentService.unmarkAsPurchased(targetUsrId, presentId);
  }

  presentHasLink(present:any):boolean {
    return present.url != null && present.url.length > 0;
  }
}
