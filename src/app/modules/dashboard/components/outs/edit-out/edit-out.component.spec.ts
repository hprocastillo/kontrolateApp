import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOutComponent } from './edit-out.component';

describe('EditOutComponent', () => {
  let component: EditOutComponent;
  let fixture: ComponentFixture<EditOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
