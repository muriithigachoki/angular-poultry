import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelIncomeComponent } from './del-income.component';

describe('DelIncomeComponent', () => {
  let component: DelIncomeComponent;
  let fixture: ComponentFixture<DelIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelIncomeComponent]
    });
    fixture = TestBed.createComponent(DelIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
