import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowFinderComponent } from './follow-finder/follow-finder.component';
import { UiModule } from '../ui/ui.module';
import { SharedModule } from '../shared/shared.module';
import { FollowerListComponent } from './follower-list/follower-list.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    SharedModule
  ],
  declarations: [FollowFinderComponent,
    FollowerListComponent],
  exports: [
    FollowFinderComponent,
    FollowerListComponent
  ]
})
export class WishListModule { }
