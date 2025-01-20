import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelValueListComponent } from './label-value-list.component';

describe('LabelValueListComponent', () => {
  let component: LabelValueListComponent;
  let fixture: ComponentFixture<LabelValueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelValueListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
