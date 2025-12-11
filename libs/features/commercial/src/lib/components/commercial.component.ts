import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@alm-platform/ui';

@Component({
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Commercial</h1>
      <lib-card title="Commercial Information" subtitle="Pricing and licensing">
        <p>Commercial details placeholder</p>
      </lib-card>
    </div>
  `,
})
export class CommercialComponent {}
