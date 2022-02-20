import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorDateOutComponent } from './selector-date-out.component';

describe('SelectorDateOutComponent', () => {
  let component: SelectorDateOutComponent;
  let fixture: ComponentFixture<SelectorDateOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorDateOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorDateOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
