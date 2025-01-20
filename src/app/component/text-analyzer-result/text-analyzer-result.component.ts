import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NxBadgeComponent} from '@aposin/ng-aquila/badge';
import {NxLinkComponent} from '@aposin/ng-aquila/link';
import {
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
} from '@aposin/ng-aquila/table';
import {CharacterOccurrences, TextAnalysisResult} from '../../domain/text-analysis/text-analysis.model';
import {NxColComponent, NxLayoutComponent, NxRowComponent} from '@aposin/ng-aquila/grid';
import {C} from '@angular/cdk/keycodes';

/**
 * @title Simple Table
 */
@Component({
  selector: 'app-text-analyzer-result',
  templateUrl: './text-analyzer-result.component.html',
  styleUrl: './text-analyzer-result.component.css',
  standalone: true,
  imports: [
    NxTableComponent,
    NxTableRowComponent,
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxLinkComponent,
    RouterLink,
    NxBadgeComponent,
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
  ],
})
export class TextAnalyzerResultComponent implements OnChanges {
  tableElements: TableViewModel[];
  @Input() analyzerResult: CharacterOccurrences = new CharacterOccurrences([]);

  constructor() {
    this.tableElements = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("TextAnalyzerResultComponent.ngOnChanges called, changes: %o", changes);
    console.log("TextAnalyzerResultComponent.ngOnChanges called, analyzerResult: %o", this.analyzerResult);
    // @ts-ignore
    this.tableElements = this.mapToViewModel(this.analyzerResult);
    console.log("TextAnalyzerResultComponent.ngOnChanges called, tableElements: %o", this.tableElements);
  }

  mapToViewModel(result: CharacterOccurrences): TableViewModel[] {

    const elements: TableViewModel[] = [];
    let idCount = 0;
    result.characterOccurrences.forEach((occ) => elements.push({
      id: idCount++,
      letter: occ.character,
      occurrence: occ.numberOfOccurrences}));

    return elements;
  }
}

export interface TableViewModel {
  id: number;
  letter: string,
  occurrence: number
}
