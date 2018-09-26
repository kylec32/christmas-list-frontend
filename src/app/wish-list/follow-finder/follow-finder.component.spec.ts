import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowFinderComponent } from './follow-finder.component';

describe('FollowFinderComponent', () => {
  let component: FollowFinderComponent;
  let fixture: ComponentFixture<FollowFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
