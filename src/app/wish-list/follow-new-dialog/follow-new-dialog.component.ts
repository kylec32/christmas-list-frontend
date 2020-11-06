import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Follower } from '../interfaces/follower';
import { LinkerService } from '../../services/linker.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-follow-new-dialog',
  templateUrl: './follow-new-dialog.component.html',
  styleUrls: ['./follow-new-dialog.component.css']
})
export class FollowNewDialogComponent implements OnInit{
  searchList: Follower[] = [];
  searchField: FormControl;
  followForm: FormGroup;
  loading: boolean = false;

  constructor(private dialogRef: MatDialogRef<FollowNewDialogComponent>,
    private linkerService: LinkerService,
    private fb:FormBuilder) { }

  ngOnInit() {
    this.searchField = new FormControl();
    this.followForm = this.fb.group({search: this.searchField});

    this.searchField
              .valueChanges
              .pipe(
                tap( _ => 
                  this.loading = true
                )
              )
              .debounceTime(400)
              .switchMap(term => {
                if(term.length > 0) {
                  return this.linkerService.searchFollowers(term);
                } else {
                  return Observable.of([]);
                }
              })
              .pipe(
                tap( _ => 
                  this.loading = false
                )
              )
              .subscribe(result => this.searchList = result);
  }

  followWithEmail(user: Follower): void {
    this.searchList = [];
    this.searchField.setValue('');
    this.dialogRef.close({cancelled: false, follower: user});
  }

  noResults(): boolean {
    return this.searchList.length == 0 && !this.loading && this.searchField.value != undefined && this.searchField.value.length > 0;
  }

  done() {
    this.dialogRef.close({cancelled: true});
  }

}
