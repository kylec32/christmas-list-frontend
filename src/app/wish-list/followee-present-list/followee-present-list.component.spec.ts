import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolloweePresentListComponent } from './followee-present-list.component';

describe('FolloweePresentListComponent', () => {
  let component: FolloweePresentListComponent;
  let fixture: ComponentFixture<FolloweePresentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolloweePresentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolloweePresentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
