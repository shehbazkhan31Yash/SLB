import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-form-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border rounded-lg p-6 mb-4">
      <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
      <p *ngIf="description" class="text-gray-600 mb-4">{{ description }}</p>
      <ng-content></ng-content>
    </div>
  `,
})
export class FormSectionComponent {
  @Input() title: string = '';
  @Input() description?: string;
}
