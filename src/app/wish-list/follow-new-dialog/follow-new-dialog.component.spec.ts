import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowNewDialogComponent } from './follow-new-dialog.component';

describe('FollowNewDialogComponent', () => {
  let component: FollowNewDialogComponent;
  let fixture: ComponentFixture<FollowNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
