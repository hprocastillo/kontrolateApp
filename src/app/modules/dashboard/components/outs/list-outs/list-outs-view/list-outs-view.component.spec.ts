import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOutsViewComponent } from './list-outs-view.component';

describe('ListOutsViewComponent', () => {
  let component: ListOutsViewComponent;
  let fixture: ComponentFixture<ListOutsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOutsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOutsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
