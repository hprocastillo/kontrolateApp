import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewOutComponent} from './view-out.component';

describe('ViewOutComponent', () => {
  let component: ViewOutComponent;
  let fixture: ComponentFixture<ViewOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
