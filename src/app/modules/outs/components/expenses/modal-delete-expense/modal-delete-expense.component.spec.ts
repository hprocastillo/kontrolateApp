import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteExpenseComponent } from './modal-delete-expense.component';

describe('ModalDeleteExpenseComponent', () => {
  let component: ModalDeleteExpenseComponent;
  let fixture: ComponentFixture<ModalDeleteExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
