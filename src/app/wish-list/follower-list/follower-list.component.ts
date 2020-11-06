import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Follower } from '../interfaces/follower';
import { MatDialog } from '@angular/material/dialog';

import { FollowNewDialogComponent } from '../follow-new-dialog/follow-new-dialog.component';

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.css']
})
export class FollowerListComponent implements OnInit {

  @Input() following: Follower[]
  @Output() onDelete: EventEmitter<Follower> = new EventEmitter<Follower>();
  @Output() newFolloweeSelected = new EventEmitter<Follower>();
  expanded: boolean = true;
  contentClass: string = "visible";
  

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  followersEmpty():boolean {
    return typeof(this.following) == "undefined" || this.following.length == 0;
  }

  removeFollower(followee) {
    this.onDelete.emit(followee);
  }

  toggleVisible() {
    if(this.expanded) {
      this.contentClass = "collapsed";
    } else {
      this.contentClass = "visible";
    }
    this.expanded = !this.expanded;
  }

  scrollToUserPresents(followedUser) {
    document.getElementById(followedUser.id + '-present-list').scrollIntoView();
  }

  openNewFollowerDialog(event: any) {
    event.stopPropagation()
    let dialogRef = this.dialog.open(FollowNewDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if(!data.cancelled) {
        this.newFolloweeSelected.emit(data.follower);
      }
    });
  }
}
