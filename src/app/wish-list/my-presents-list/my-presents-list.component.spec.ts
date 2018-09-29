import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPresentsListComponent } from './my-presents-list.component';

describe('MyPresentsListComponent', () => {
  let component: MyPresentsListComponent;
  let fixture: ComponentFixture<MyPresentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPresentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPresentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
