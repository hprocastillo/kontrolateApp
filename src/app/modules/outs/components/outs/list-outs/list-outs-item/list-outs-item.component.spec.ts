import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListOutsItemComponent} from './list-outs-item.component';

describe('ListOutsItemComponent', () => {
  let component: ListOutsItemComponent;
  let fixture: ComponentFixture<ListOutsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOutsItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOutsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
