import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'lib-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <table mat-table [dataSource]="dataSource" class="w-full">
      <ng-container *ngFor="let column of columns" [matColumnDef]="column.key">
        <th mat-header-cell *matHeaderCellDef>{{ column.label }}</th>
        <td mat-cell *matCellDef="let element">{{ element[column.key] }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
})
export class DataTableComponent {
  @Input() dataSource: any[] = [];
  @Input() columns: { key: string; label: string }[] = [];

  get displayedColumns(): string[] {
    return this.columns.map((c) => c.key);
  }
}
