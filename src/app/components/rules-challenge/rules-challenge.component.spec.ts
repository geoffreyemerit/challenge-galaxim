import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesChallengeComponent } from './rules-challenge.component';

describe('RulesChallengeComponent', () => {
  let component: RulesChallengeComponent;
  let fixture: ComponentFixture<RulesChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesChallengeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
