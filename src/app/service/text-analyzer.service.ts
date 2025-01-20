import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  CharacterOccurrence,
  CharacterOccurrences, TextAnalysisRequest, TextAnalysisResponse,
  TextAnalysisResult
} from '../domain/text-analysis/text-analysis.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextAnalyzerService {

  private static readonly VOWEL_LIST: string[] = ['A', 'E', 'I', 'O', 'U'];
  private static readonly CONSONANT_LIST: string[] = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/text-analysis';
  }

  public detectVowelsOffline(sentence: string): CharacterOccurrences {
    return this.detectCharacters(sentence, TextAnalyzerService.VOWEL_LIST);
  }

  public detectConsonantsOffline(sentence: string): CharacterOccurrences {
    return this.detectCharacters(sentence, TextAnalyzerService.CONSONANT_LIST);
  }

  public detectVowelsOnline(sentence: string): Observable<TextAnalysisResponse> {
    console.info('detectVowelsOnline');
    return this.analyzeOnline(sentence, true);
  }

  public detectConsonantsOnline(sentence: string): Observable<TextAnalysisResponse> {
    console.info('detectConsonantsOnline');
    return this.analyzeOnline(sentence, false);
  }

  private detectCharacters(sentence: string, characterList: string[]): CharacterOccurrences {
    const occurrences: CharacterOccurrence[] = characterList.map(character => this.mapToOccurrence(character, sentence));
    return new CharacterOccurrences(occurrences);
  }

  private mapToOccurrence(character: string, sentence: string): CharacterOccurrence {
    const regex = new RegExp(character, 'g');
    const occurrences = (sentence.toUpperCase().match(regex) || []).length;

    return new CharacterOccurrence(character, occurrences);
  }

  private analyzeOnline(sentence: string, vowels: boolean): Observable<TextAnalysisResponse> {

    const request: TextAnalysisRequest = {
      sentence: sentence,
      vowels: vowels
    };

    return this.http.put<TextAnalysisResponse>(this.url, request);
  }
}
