import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarWrapperComponent } from './toolbar-wrapper.component';

describe('ToolbarWrapperComponent', () => {
  let component: ToolbarWrapperComponent;
  let fixture: ComponentFixture<ToolbarWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
