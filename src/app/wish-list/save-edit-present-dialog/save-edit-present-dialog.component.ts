import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-edit-present-dialog',
  templateUrl: './save-edit-present-dialog.component.html',
  styleUrls: ['./save-edit-present-dialog.component.css']
})
export class SaveEditPresentDialogComponent implements OnInit {

  public name:String = "";
  public url:String = "";

  constructor(private dialogRef: MatDialogRef<SaveEditPresentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if(this.data != null) {
      this.name = (this.data.description != undefined && this.data.description.length > 0) ? this.data.description : "";
      this.url = (this.data.url != undefined && this.data.url.length > 0) ? this.data.url : "";
    }
  }

  save():void {
    this.dialogRef.close({cancelled: false, name: this.name, url: this.url});
  }

  cancel():void {
    this.dialogRef.close({cancelled: true});
  }

  attemptSave(): void {
    if(this.isSavable()) {
      this.dialogRef.close({cancelled: false, name: this.name, url: this.url});
    }
  }

  isSavable(): boolean {
    return this.name != undefined && this.name.length > 0;
  }
}
