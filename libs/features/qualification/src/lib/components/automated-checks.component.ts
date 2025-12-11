import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CardComponent } from '@alm-platform/ui';
import { WebSocketService, JobProgress } from '@alm-platform/utils';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressBarModule, CardComponent],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Automated Checks</h1>

      <lib-card title="Security Scan" subtitle="Run automated security checks">
        <button mat-raised-button color="primary" (click)="startCheck()" [disabled]="isRunning">
          Start Check
        </button>

        <div *ngIf="jobProgress" class="mt-4">
          <mat-progress-bar mode="determinate" [value]="jobProgress.progress"></mat-progress-bar>
          <p class="mt-2">{{ jobProgress.message }}</p>
          <p class="text-sm text-gray-600">Status: {{ jobProgress.status }}</p>
        </div>
      </lib-card>
    </div>
  `,
})
export class AutomatedChecksComponent {
  private wsService = inject(WebSocketService);

  jobProgress: JobProgress | null = null;
  isRunning = false;

  startCheck(): void {
    this.isRunning = true;
    const jobId = `job-${Date.now()}`;

    this.wsService.startJob(jobId).subscribe({
      next: (progress) => {
        this.jobProgress = progress;
        if (progress.status === 'completed') {
          this.isRunning = false;
        }
      },
      error: () => {
        this.isRunning = false;
      },
    });
  }
}
