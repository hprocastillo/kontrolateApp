import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOutComponent } from './delete-out.component';

describe('DeleteOutComponent', () => {
  let component: DeleteOutComponent;
  let fixture: ComponentFixture<DeleteOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
