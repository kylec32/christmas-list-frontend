import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-edit-present-dialog',
  templateUrl: './save-edit-present-dialog.component.html',
  styleUrls: ['./save-edit-present-dialog.component.css']
})
export class SaveEditPresentDialogComponent implements OnInit {

  public name:String = "";
  public url:String = "";

  constructor(private dialogRef: MdDialogRef<SaveEditPresentDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.name = this.data.description;
    this.url = this.data.url;
  }

  save():void {
    this.dialogRef.close({cancelled: false, name: this.name, url: this.url});
  }

  cancel():void {
    this.dialogRef.close({cancelled: true});
  }

}
