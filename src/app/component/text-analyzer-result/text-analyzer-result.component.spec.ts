import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnalyzerResultComponent } from './text-analyzer-result.component';

describe('TextAnalyzerResultComponent', () => {
  let component: TextAnalyzerResultComponent;
  let fixture: ComponentFixture<TextAnalyzerResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAnalyzerResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAnalyzerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
