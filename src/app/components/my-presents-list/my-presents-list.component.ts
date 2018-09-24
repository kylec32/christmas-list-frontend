import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MyPresentsService } from '../../services/mypresents.service';
import { AnalyticsService } from '../../services/analytics.service';

import { SaveEditPresentDialogComponent } from '../save-edit-present-dialog/save-edit-present-dialog.component';

@Component({
  selector: 'app-my-presents-list',
  templateUrl: './my-presents-list.component.html',
  styleUrls: ['./my-presents-list.component.css']
})
export class MyPresentsListComponent implements OnInit {

  myPresents:Observable<Array<any>>;

  constructor(private myPresentsService: MyPresentsService,
              private dialog: MatDialog,
              private snakBar: MatSnackBar,
              private analyticsService: AnalyticsService) {
    this.myPresents = this.myPresentsService.myPresents;
   }

  ngOnInit() {
    this.myPresentsService.loadMyPresents();
  }

  addPresent():void {
    let dialogRef = this.dialog.open(SaveEditPresentDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if(!data.cancelled) {
        this.analyticsService.sendEvent('addedPresent');
        this.myPresentsService.newPresent(data.name, data.url);
      }
    });
  }

  removePresent(id:string):void {
    this.analyticsService.sendEvent('removedPresent');
    this.myPresentsService.removePresent(id);
  }

  editPresent(present:any):void {
    let dialogRef = this.dialog.open(SaveEditPresentDialogComponent,{
                data: {"description": present.title
                      , "url": present.url}
              });
    
    dialogRef.afterClosed().subscribe(data => {
      if(!data.cancelled) {
        this.analyticsService.sendEvent('editedPresent');
        this.myPresentsService.updatePresent(present.id, data.name, data.url);
      }
    });
  }

}
