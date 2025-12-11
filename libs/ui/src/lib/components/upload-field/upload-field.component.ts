import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'lib-upload-field',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <div class="border-2 border-dashed rounded-lg p-6 text-center">
      <input
        type="file"
        #fileInput
        (change)="onFileSelected($event)"
        class="hidden"
        multiple
      />
      <button mat-raised-button color="primary" (click)="fileInput.click()">
        <mat-icon>cloud_upload</mat-icon>
        Upload Files
      </button>
      <p class="mt-2 text-sm text-gray-600">or drag and drop files here</p>

      <div *ngIf="uploadProgress > 0" class="mt-4">
        <mat-progress-bar mode="determinate" [value]="uploadProgress"></mat-progress-bar>
        <p class="text-sm mt-2">{{ uploadProgress }}% uploaded</p>
      </div>
    </div>
  `,
})
export class UploadFieldComponent {
  @Output() filesSelected = new EventEmitter<FileList>();
  uploadProgress = 0;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.filesSelected.emit(input.files);
      this.simulateUpload();
    }
  }

  private simulateUpload(): void {
    this.uploadProgress = 0;
    const interval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  }
}
