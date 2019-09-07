import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowFinderComponent } from './follow-finder/follow-finder.component';
import { UiModule } from '../ui/ui.module';
import { SharedModule } from '../shared/shared.module';
import { FollowerListComponent } from './follower-list/follower-list.component';
import { FolloweePresentListComponent } from './followee-present-list/followee-present-list.component';
import { MyPresentsListComponent } from './my-presents-list/my-presents-list.component';
import { SaveEditPresentDialogComponent } from './save-edit-present-dialog/save-edit-present-dialog.component';
import { FollowNewDialogComponent } from './follow-new-dialog/follow-new-dialog.component'

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    SharedModule
  ],
  declarations: [FollowFinderComponent,
    FollowerListComponent,
    FolloweePresentListComponent,
    MyPresentsListComponent,
    SaveEditPresentDialogComponent,
    FollowNewDialogComponent,
  ],
  entryComponents: [
    SaveEditPresentDialogComponent,
    FollowNewDialogComponent
  ],
  exports: [
    FollowFinderComponent,
    FollowerListComponent,
    FolloweePresentListComponent,
    MyPresentsListComponent
  ]
})
export class WishListModule { }
