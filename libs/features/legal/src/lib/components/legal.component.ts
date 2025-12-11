import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@alm-platform/ui';

@Component({
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Legal</h1>
      <lib-card title="Legal Review" subtitle="Compliance and legal documentation">
        <p>Legal review placeholder</p>
      </lib-card>
    </div>
  `,
})
export class LegalComponent {}
