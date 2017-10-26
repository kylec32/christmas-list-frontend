import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdSnackBar, MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { FOLLOWING_LOADED, FOLLOWEE_DELETE, FOLLOWING_ADD } from '../../reducers/connection.reducer';

import { SaveEditPresentDialogComponent } from '../save-edit-present-dialog/save-edit-present-dialog.component';

import { LinkerService } from '../../services/linker.service';
import { MyPresentsService } from '../../services/mypresents.service';
import { PresentService } from '../../services/presents.service';

@Component({
  selector: 'app-christmas-list',
  templateUrl: './christmas-list.component.html',
  styleUrls: ['./christmas-list.component.css']
})
export class ChristmasListComponent implements OnInit {

  newFollowEmail:String = "";
  following:any[] = [];
  token:String = "";
  myPresents:Observable<Array<any>>;
  followerPresents:Observable<Array<any>>;

  constructor(private store: Store<any>,
              private linkerService: LinkerService,
              private snakBar: MdSnackBar,
              private myPresentsService: MyPresentsService,
              private presentService: PresentService,
              private dialog: MdDialog) { 
                  this.myPresents = this.myPresentsService.myPresents;
                  this.followerPresents = this.presentService.otherPresents;
              }

  ngOnInit() {
    
    this.loadFollowing();
    this.myPresentsService.loadMyPresents(this.token);
    this.presentService.loadOtherPresents();

    this.store.select('following').subscribe((following) => {
      this.following = following;
    }, (error) => {
      console.log(error);
    })
  }

  loadFollowing() {
    this.linkerService.getFollowed(this.token)
        .subscribe((following) => {
          this.store.dispatch({type: FOLLOWING_LOADED, payload: {following: following}});
        }, (err) => {
          this.snakBar.open('Issue Getting Following List', null, {
            duration: 2000,
          });
        });
  }

  removeFollower(followee) {
    this.store.dispatch({type: FOLLOWEE_DELETE, payload: {toDelete: followee}});
    this.linkerService.disconnectFollowee(this.token, followee.ID)
        .subscribe((removeResult) => {
          this.snakBar.open(`Successfully disconnected from: ${followee.userName}`
                              , null
                              , { duration: 2000 });
          this.loadFollowing();
        }, (error) => {
          this.loadFollowing();
          this.snakBar.open(`Issue dissconnecting from: ${followee.userName}`, null, {
            duration: 2000,
          });
        });
  }

  followNew() {
    const email = this.newFollowEmail;
    this.store.dispatch({type: FOLLOWING_ADD, payload:{"userName": email}});
    this.linkerService.followNew(this.token, email)
          .subscribe((addResult) => {
            this.snakBar.open(`Successfully added: ${email}`
            , null
            , { duration: 2000 });

            this.loadFollowing();
          }, (error) => {
            this.loadFollowing();
            this.snakBar.open(`Couldn't find account for: ${email}`, null, {
              duration: 2000,
            });
          });
    this.newFollowEmail = "";
  }

  addPresent():void {
    let dialogRef = this.dialog.open(SaveEditPresentDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if(!data.cancelled) {
        this.myPresentsService.newPresent(this.token, data.name, data.url);
      }
    });
  }

  removePresent(id:Number):void {
    this.myPresentsService.removePresent(this.token, id);
  }

  editPresent(present:any):void {
    let dialogRef = this.dialog.open(SaveEditPresentDialogComponent,{
                data: {"description": present.description
                      , "url": present.url}
              });
    
    dialogRef.afterClosed().subscribe(data => {
      if(!data.cancelled) {
        this.myPresentsService.updatePresent(this.token, present.ID, data.name, data.url);
      }
    });
  }

  followersEmpty():boolean {
    return typeof(this.following) == "undefined" || this.following.length == 0;
  }

  markAsPurchased(id:Number):void {
    this.presentService.markAsPurchased(id);
  }

  unmarkAsPurchased(id:Number):void {
    this.presentService.unmarkAsPurchased(id);
  }
}
