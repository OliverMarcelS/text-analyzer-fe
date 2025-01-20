export interface TextAnalysisResult {
  result: Map<string, number>;
}

export class CharacterOccurrence {
  constructor(public character: string, public numberOfOccurrences: number) {
  }
}

export class CharacterOccurrences {
  constructor(public characterOccurrences: CharacterOccurrence[]) {
  }
}

export class TextAnalysisRequest {
  constructor(public sentence: string, public vowels: boolean) {
  }
}

export class TextAnalysisResponse {
  constructor(public textAnalysisRequest: TextAnalysisRequest, public characterOccurrences: CharacterOccurrence[]) {
  }
}
