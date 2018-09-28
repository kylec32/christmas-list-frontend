import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Follower } from '../interfaces/follower';

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.css']
})
export class FollowerListComponent implements OnInit {

  @Input() following: Follower[]
  @Output() onDelete: EventEmitter<Follower> = new EventEmitter<Follower>();
  expanded: boolean = false;
  contentClass: string = "visible";

  constructor() { }

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
      this.contentClass = "visible";
    } else {
      this.contentClass = "collapsed";
    }
    this.expanded = !this.expanded;
  }

}
