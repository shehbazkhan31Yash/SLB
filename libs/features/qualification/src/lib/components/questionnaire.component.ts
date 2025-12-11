import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatButtonModule } from '@angular/material/button';
import { QuestionnaireApiService } from '@alm-platform/api';
import { UploadFieldComponent } from '@alm-platform/ui';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatButtonModule,
    UploadFieldComponent,
  ],
  template: `
    <div class="p-6 max-w-4xl">
      <h1 class="text-2xl font-bold mb-6">Security Questionnaire</h1>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>

        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-4">Upload Evidence</h3>
          <lib-upload-field (filesSelected)="onFilesSelected($event)"></lib-upload-field>
        </div>

        <div class="mt-6 flex gap-4">
          <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">
            Submit
          </button>
          <button mat-button type="button">Save Draft</button>
        </div>
      </form>
    </div>
  `,
})
export class QuestionnaireComponent implements OnInit {
  private questionnaireApi = inject(QuestionnaireApiService);

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  ngOnInit(): void {
    this.questionnaireApi.getQuestionnaire('1').subscribe((questionnaire) => {
      this.fields = questionnaire.schema.fields;
    });
  }

  onSubmit(): void {
    console.log('Questionnaire submitted:', this.model);
  }

  onFilesSelected(files: FileList): void {
    console.log('Files selected:', files);
  }
}
