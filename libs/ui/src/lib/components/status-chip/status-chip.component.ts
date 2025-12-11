import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'lib-status-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  template: `
    <mat-chip-set>
      <mat-chip [ngClass]="getStatusClass()">{{ status }}</mat-chip>
    </mat-chip-set>
  `,
})
export class StatusChipComponent {
  @Input() status: string = '';

  getStatusClass(): string {
    const statusMap: Record<string, string> = {
      draft: 'bg-gray-200',
      'in-review': 'bg-blue-200',
      approved: 'bg-green-200',
      rejected: 'bg-red-200',
    };
    return statusMap[this.status] || 'bg-gray-200';
  }
}
