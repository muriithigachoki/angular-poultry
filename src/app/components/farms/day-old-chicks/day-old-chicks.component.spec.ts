import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOldChicksComponent } from './day-old-chicks.component';

describe('DayOldChicksComponent', () => {
  let component: DayOldChicksComponent;
  let fixture: ComponentFixture<DayOldChicksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayOldChicksComponent]
    });
    fixture = TestBed.createComponent(DayOldChicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
