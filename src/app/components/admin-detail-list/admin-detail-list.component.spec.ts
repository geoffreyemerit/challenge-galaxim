import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailListComponent } from './admin-detail-list.component';

describe('AdminDetailListComponent', () => {
  let component: AdminDetailListComponent;
  let fixture: ComponentFixture<AdminDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
