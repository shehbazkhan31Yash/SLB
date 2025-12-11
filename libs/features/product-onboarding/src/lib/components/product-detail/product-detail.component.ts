import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@alm-platform/ui';

@Component({
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="p-6">
      <lib-card title="Product Details" subtitle="View product information">
        <p>Product detail view placeholder</p>
      </lib-card>
    </div>
  `,
})
export class ProductDetailComponent {}
