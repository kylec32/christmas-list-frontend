import { Component, Output, EventEmitter } from '@angular/core';
import { LinkerService } from '../../services/linker.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Follower } from '../interfaces/follower';
import 'rxjs/Rx';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-follow-finder',
  templateUrl: './follow-finder.component.html',
  styleUrls: ['./follow-finder.component.css']
})
export class FollowFinderComponent {
  searchList: Follower[] = [];
  searchField: FormControl;
  followForm: FormGroup;
  loading: boolean = false;
  @Output() newFolloweeSelected = new EventEmitter<Follower>();

  constructor(private linkerService: LinkerService,
              private fb:FormBuilder) {
    this.searchField = new FormControl();
    this.followForm = fb.group({search: this.searchField});

    this.searchField.valueChanges
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
    this.newFolloweeSelected.emit(user);
    this.searchField.setValue('');
  }

  noResults(): boolean {
    return this.searchList.length == 0 && !this.loading && this.searchField.value != undefined && this.searchField.value.length > 0;
  }
}
