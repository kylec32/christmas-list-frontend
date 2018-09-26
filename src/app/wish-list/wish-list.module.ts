import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowFinderComponent } from './follow-finder/follow-finder.component';
import { UiModule } from '../ui/ui.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    SharedModule
  ],
  declarations: [FollowFinderComponent],
  exports: [
    FollowFinderComponent
  ]
})
export class WishListModule { }
