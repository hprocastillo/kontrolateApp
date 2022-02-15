import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListExpensesItemComponent} from './list-expenses-item.component';

describe('ListExpensesItemComponent', () => {
  let component: ListExpensesItemComponent;
  let fixture: ComponentFixture<ListExpensesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListExpensesItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExpensesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
