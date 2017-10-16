import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristmasListComponent } from './christmas-list.component';

describe('ChristmasListComponent', () => {
  let component: ChristmasListComponent;
  let fixture: ComponentFixture<ChristmasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChristmasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChristmasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
