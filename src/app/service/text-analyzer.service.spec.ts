import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TextAnalyzerService} from './text-analyzer.service';
import {
  CharacterOccurrence,
  CharacterOccurrences,
  TextAnalysisResponse
} from '../domain/text-analysis/text-analysis.model';


describe('TextAnalyzerService', () => {
  let service: TextAnalyzerService;
  let httpMock: HttpTestingController;
  const sentence = 'This is a sentence.';
  const url = 'http://localhost:8080/text-analysis';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TextAnalyzerService, provideHttpClientTesting()]
    });

    service = TestBed.inject(TextAnalyzerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect vowels offline', () => {
    const result: CharacterOccurrences = service.detectVowelsOffline(sentence);

    expect(result.characterOccurrences).toEqual([
      new CharacterOccurrence('A', 1),
      new CharacterOccurrence('E', 3),
      new CharacterOccurrence('I', 2),
      new CharacterOccurrence('O', 0),
      new CharacterOccurrence('U', 0)
    ]);
  });

  it('should detect consonants offline', () => {
    const result: CharacterOccurrences = service.detectConsonantsOffline(sentence);

    expect(result.characterOccurrences).toEqual([
      new CharacterOccurrence('B', 0),
      new CharacterOccurrence('C', 1),
      new CharacterOccurrence('D', 0),
      new CharacterOccurrence('F', 0),
      new CharacterOccurrence('G', 0),
      new CharacterOccurrence('H', 1),
      new CharacterOccurrence('J', 0),
      new CharacterOccurrence('K', 0),
      new CharacterOccurrence('L', 0),
      new CharacterOccurrence('M', 0),
      new CharacterOccurrence('N', 2),
      new CharacterOccurrence('P', 0),
      new CharacterOccurrence('Q', 0),
      new CharacterOccurrence('R', 0),
      new CharacterOccurrence('S', 3),
      new CharacterOccurrence('T', 2),
      new CharacterOccurrence('V', 0),
      new CharacterOccurrence('W', 0),
      new CharacterOccurrence('X', 0),
      new CharacterOccurrence('Y', 0),
      new CharacterOccurrence('Z', 0)
    ]);
  });

  it('should detect vowels online', () => {
    const response: TextAnalysisResponse = {
      textAnalysisRequest: {
        sentence: sentence,
        vowels: true
      },
      characterOccurrences: [
        {character: 'A', numberOfOccurrences: 0},
        {character: 'E', numberOfOccurrences: 14},
        {character: 'I', numberOfOccurrences: 0},
        {character: 'O', numberOfOccurrences: 2},
        {character: 'U', numberOfOccurrences: 0}
      ]
    };

    service.detectVowelsOnline(sentence).subscribe(res => {
      expect(res).toEqual(response);
      console.log('res: %o', res);
      console.log('response: %o', response);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    req.flush(response);
  });

  it('should detect consonants online', () => {
    const response: TextAnalysisResponse = {
      textAnalysisRequest: {
        sentence: sentence,
        vowels: true
      },
      characterOccurrences: [
        {character: 'B', numberOfOccurrences: 0},
        {character: 'C', numberOfOccurrences: 0},
        {character: 'D', numberOfOccurrences: 1},
        {character: 'F', numberOfOccurrences: 0},
        {character: 'G', numberOfOccurrences: 0},
        {character: 'H', numberOfOccurrences: 1},
        {character: 'J', numberOfOccurrences: 0},
        {character: 'K', numberOfOccurrences: 0},
        {character: 'L', numberOfOccurrences: 3},
        {character: 'M', numberOfOccurrences: 0},
        {character: 'N', numberOfOccurrences: 0},
        {character: 'P', numberOfOccurrences: 0},
        {character: 'Q', numberOfOccurrences: 0},
        {character: 'R', numberOfOccurrences: 1},
        {character: 'S', numberOfOccurrences: 0},
        {character: 'T', numberOfOccurrences: 0},
        {character: 'V', numberOfOccurrences: 0},
        {character: 'W', numberOfOccurrences: 1},
        {character: 'X', numberOfOccurrences: 0},
        {character: 'Y', numberOfOccurrences: 0},
        {character: 'Z', numberOfOccurrences: 0}
      ]
    };

    service.detectConsonantsOnline(sentence).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    req.flush(response);
  });
});
