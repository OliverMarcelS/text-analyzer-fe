import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
//import { Component, EventEmitter, HostBinding, Inject, Input, Output } from '@angular/core';

import {
  DATA_DISPLAY_DEFAULT_OPTIONS,
  DataDisplayDefaultOptions,
  NxDataDisplayComponent,
  NxDataDisplayLabelComponent,
} from '@aposin/ng-aquila/data-display';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@aposin/ng-aquila/grid';
import {NxHeadlineComponent} from '@aposin/ng-aquila/headline';
import {NxLinkComponent} from '@aposin/ng-aquila/link';
import {NxListComponent} from '@aposin/ng-aquila/list';
import {NxDialogService} from '@aposin/ng-aquila/modal';
import {TextAnalyzerService} from '../../service/text-analyzer.service';
import {FormBuilder, Validators} from '@angular/forms';
import {TextAnalysisResult} from '../../domain/text-analysis/text-analysis.model';

const options: DataDisplayDefaultOptions = {
  size: 'medium', // expert mode default size
};

/**
 * @title Horizontal data display example
 */
@Component({
  selector: 'app-label-value-list',
  standalone: true,
  templateUrl: './label-value-list.component.html',
  styleUrl: './label-value-list.component.css',
  providers: [
    {
      provide: DATA_DISPLAY_DEFAULT_OPTIONS,
      useValue: options,
    },
  ],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxHeadlineComponent,
    NxDataDisplayComponent,
    NxDataDisplayLabelComponent,
    NxLinkComponent,
    NxListComponent,
  ],
})
export class LabelValueListComponent implements OnInit, OnChanges {

  @Input() analyzerResult: TextAnalysisResult = {result: new Map<string, number>()};

  constructor(private analyzerService: TextAnalyzerService) {
    console.log("label-value-list component constructor called.");
  }

  ngOnInit(): void {
    console.log("LabelValueListComponent.init called, analyzerResult: %o", this.analyzerResult);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("LabelValueListComponent.ngOnChanges called, changes: %o", changes);
  }
}
