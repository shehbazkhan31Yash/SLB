import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@alm-platform/ui';

@Component({
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Market Material</h1>
      <lib-card title="Composite Authoring" subtitle="Create marketing content">
        <p>Rich-text editor placeholder (ngx-quill integration)</p>
        <p class="mt-2 text-sm text-gray-600">Draft auto-save enabled</p>
      </lib-card>
    </div>
  `,
})
export class MarketMaterialComponent {}
