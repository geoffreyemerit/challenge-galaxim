import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailFilterComponent } from './admin-detail-filter.component';

describe('AdminDetailFilterComponent', () => {
  let component: AdminDetailFilterComponent;
  let fixture: ComponentFixture<AdminDetailFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetailFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
