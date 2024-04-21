import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelExpenseComponent } from './del-expense.component';

describe('DelExpenseComponent', () => {
  let component: DelExpenseComponent;
  let fixture: ComponentFixture<DelExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelExpenseComponent]
    });
    fixture = TestBed.createComponent(DelExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
