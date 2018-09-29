import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-followee-present-list',
  templateUrl: './followee-present-list.component.html',
  styleUrls: ['./followee-present-list.component.css']
})
export class FolloweePresentListComponent implements OnInit {

  @Input() followeeWithPresents: any[];
  expanded: boolean = true;
  contentClass: string = "visible";
  @Output() onMarkAsPurchased = new EventEmitter<any>();
  @Output() onUnmarkAsPurchased = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  presentHasLink(present:any):boolean {
    return present.url != null && present.url.length > 0;
  }

  markAsPurchased(targetUserId:string, presentId: string):void {
    console.log(targetUserId);
    console.log(presentId);
    this.onMarkAsPurchased.emit({'targetUserId': targetUserId, 'presentId': presentId});
  }

  unmarkAsPurchased(targetUserId:string, presentId: string):void {
    this.onUnmarkAsPurchased.emit({'targetUserId': targetUserId, 'presentId': presentId});
  }

  toggleVisible() {
    if(this.expanded) {
      this.contentClass = "collapsed";
    } else {
      this.contentClass = "visible";
    }
    this.expanded = !this.expanded;
  }

}
