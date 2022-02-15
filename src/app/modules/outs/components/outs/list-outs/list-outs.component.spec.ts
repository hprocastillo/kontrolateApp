import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListOutsComponent} from './list-outs.component';

describe('ListOutsComponent', () => {
  let component: ListOutsComponent;
  let fixture: ComponentFixture<ListOutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOutsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
