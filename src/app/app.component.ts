import {Component, TemplateRef, ViewChild} from '@angular/core';
//import { Component, EventEmitter, HostBinding, Inject, Input, Output } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NxButtonModule, NxIconButtonComponent} from '@aposin/ng-aquila/button';
import {NxCheckboxModule} from '@aposin/ng-aquila/checkbox';
import {NxDocumentationIconModule} from '@aposin/ng-aquila/documentation-icons';
import {NxDropdownModule} from '@aposin/ng-aquila/dropdown';
import {NxFooterModule} from '@aposin/ng-aquila/footer';
import {NxFormfieldModule} from '@aposin/ng-aquila/formfield';
import {NxGridModule} from '@aposin/ng-aquila/grid';
import {NxHeadlineModule} from '@aposin/ng-aquila/headline';
import {NxIconModule} from '@aposin/ng-aquila/icon';
import {NxInputModule} from '@aposin/ng-aquila/input';
import {NxLinkModule} from '@aposin/ng-aquila/link';
import {NxMessageModule} from '@aposin/ng-aquila/message';
import {NxDialogService, NxModalModule, NxModalRef} from '@aposin/ng-aquila/modal';
import {NxOverlayModule} from '@aposin/ng-aquila/overlay';
import {NxPopoverModule} from '@aposin/ng-aquila/popover';
import {NxSmallStageModule} from '@aposin/ng-aquila/small-stage';
import {LabelValueListComponent} from './component/label-value-list/label-value-list.component';
import {TextAnalyzerService} from './service/text-analyzer.service';
import {CharacterOccurrences} from './domain/text-analysis/text-analysis.model';
import {TextAnalyzerResultComponent} from './component/text-analyzer-result/text-analyzer-result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NxButtonModule,
    NxCheckboxModule,
    NxDocumentationIconModule,
    NxDropdownModule,
    NxFooterModule,
    NxFormfieldModule,
    NxGridModule,
    NxHeadlineModule,
    NxIconModule,
    NxInputModule,
    NxLinkModule,
    NxMessageModule,
    NxModalModule,
    NxOverlayModule,
    NxPopoverModule,
    NxSmallStageModule,
    NxIconButtonComponent,
    LabelValueListComponent,
    TextAnalyzerResultComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('helpTextTemplate')
  helpTextTemplate!: TemplateRef<any>;
  @ViewChild('submitTemplate')
  submitTemplateRef!: TemplateRef<any>;
  dialogRef!: NxModalRef<any>;
  formGroup: FormGroup;
  hideAnalysis: boolean;
  analyzerResult: CharacterOccurrences;


  constructor(
    readonly dialogService: NxDialogService,
    private analyzerService: TextAnalyzerService) {

    this.formGroup = new FormBuilder().group({
      textArea: ['', Validators.required],
      offline: [false],
      vowels: [false],
    });
    this.hideAnalysis = true;
    this.analyzerResult = new CharacterOccurrences([]);
  }

  openHelpDialog(): void {
    this.dialogRef = this.dialogService.open(this.helpTextTemplate, {
      ariaLabel: 'A modal with content',
      showCloseIcon: true,
    });
  }

  submit(): void {
    this.hideAnalysis = false;
    const textToAnalyze = this.formGroup.get('textArea')?.value;
    const searchForVowels = this.formGroup.get('vowels')?.value;
    const analyzeOffline = this.formGroup.get('offline')?.value;

    analyzeOffline ? this.analyzeOffline(textToAnalyze, searchForVowels)
      : this.analyzeOnline(textToAnalyze, searchForVowels);
  }

  analyzeOnline(textToAnalyze: string, searchForVowels: boolean) {
    (searchForVowels ?
      this.analyzerService.detectVowelsOnline(textToAnalyze) :
      this.analyzerService.detectConsonantsOnline(textToAnalyze))
      .subscribe(result =>
        this.analyzerResult = {characterOccurrences: result.characterOccurrences});
  }

  analyzeOffline(textToAnalyze: string, searchForVowels: boolean) {
    this.analyzerResult = searchForVowels ?
      this.analyzerService.detectVowelsOffline(textToAnalyze) :
      this.analyzerService.detectConsonantsOffline(textToAnalyze);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

/** Copyright 2025 LitIT */
