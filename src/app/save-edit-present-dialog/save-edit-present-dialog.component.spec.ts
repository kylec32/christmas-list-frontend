import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEditPresentDialogComponent } from './save-edit-present-dialog.component';

describe('SaveEditPresentDialogComponent', () => {
  let component: SaveEditPresentDialogComponent;
  let fixture: ComponentFixture<SaveEditPresentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveEditPresentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveEditPresentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
