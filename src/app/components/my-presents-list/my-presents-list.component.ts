import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdSnackBar, MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { MyPresentsService } from '../../services/mypresents.service';

import { SaveEditPresentDialogComponent } from '../save-edit-present-dialog/save-edit-present-dialog.component';

@Component({
  selector: 'app-my-presents-list',
  templateUrl: './my-presents-list.component.html',
  styleUrls: ['./my-presents-list.component.css']
})
export class MyPresentsListComponent implements OnInit {

  myPresents:Observable<Array<any>>;

  constructor(private myPresentsService: MyPresentsService,
              private dialog: MdDialog,
              private snakBar: MdSnackBar) {
    this.myPresents = this.myPresentsService.myPresents;
   }

  ngOnInit() {
    this.myPresentsService.loadMyPresents();
  }

  addPresent():void {
    let dialogRef = this.dialog.open(SaveEditPresentDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if(!data.cancelled) {
        this.myPresentsService.newPresent(data.name, data.url);
      }
    });
  }

  removePresent(id:Number):void {
    this.myPresentsService.removePresent(id);
  }

  editPresent(present:any):void {
    let dialogRef = this.dialog.open(SaveEditPresentDialogComponent,{
                data: {"description": present.description
                      , "url": present.url}
              });
    
    dialogRef.afterClosed().subscribe(data => {
      if(!data.cancelled) {
        this.myPresentsService.updatePresent(present.ID, data.name, data.url);
      }
    });
  }

}
