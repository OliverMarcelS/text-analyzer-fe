import { TestBed } from '@angular/core/testing';

import { TextAnalyzerService } from './text-analyzer.service';

describe('TextAnalyzerService', () => {
  let service: TextAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect vowels', () => {
    let characterOccurrences = service.detectVowelsOffline('This is a sentence');
    expect(characterOccurrences.characterOccurrences).toBeTruthy();
  });
});
