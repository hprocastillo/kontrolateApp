import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteOutComponent } from './modal-delete-out.component';

describe('ModalDeleteOutComponent', () => {
  let component: ModalDeleteOutComponent;
  let fixture: ComponentFixture<ModalDeleteOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
