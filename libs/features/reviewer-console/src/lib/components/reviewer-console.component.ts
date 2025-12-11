import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CardComponent } from '@alm-platform/ui';
import { HasPermissionDirective } from '@alm-platform/auth';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    CardComponent,
    HasPermissionDirective,
  ],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Reviewer Console</h1>

      <lib-card title="Review Submission" subtitle="Product A v1.0">
        <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <mat-radio-group formControlName="decision" class="flex flex-col gap-2">
            <mat-radio-button value="approve">Approve</mat-radio-button>
            <mat-radio-button value="reject">Reject</mat-radio-button>
            <mat-radio-button value="request-changes">Request Changes</mat-radio-button>
          </mat-radio-group>

          <mat-form-field class="w-full">
            <mat-label>Comments</mat-label>
            <textarea matInput formControlName="comments" rows="4"></textarea>
          </mat-form-field>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="reviewForm.invalid"
            *appHasPermission="'security:approve'"
          >
            Submit Review
          </button>
        </form>
      </lib-card>

      <lib-card title="Audit Log" subtitle="Recent activity" class="mt-6">
        <div class="space-y-2">
          <div class="p-3 border-l-4 border-blue-500 bg-gray-50">
            <p class="font-semibold">Review submitted</p>
            <p class="text-sm text-gray-600">2 hours ago by John Doe</p>
          </div>
          <div class="p-3 border-l-4 border-green-500 bg-gray-50">
            <p class="font-semibold">Product approved</p>
            <p class="text-sm text-gray-600">1 day ago by Jane Smith</p>
          </div>
        </div>
      </lib-card>
    </div>
  `,
})
export class ReviewerConsoleComponent {
  private fb = inject(FormBuilder);

  reviewForm = this.fb.group({
    decision: ['', Validators.required],
    comments: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.reviewForm.valid) {
      console.log('Review submitted:', this.reviewForm.value);
    }
  }
}
