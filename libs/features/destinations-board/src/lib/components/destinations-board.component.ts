import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, StatusChipComponent } from '@alm-platform/ui';

@Component({
  standalone: true,
  imports: [CommonModule, CardComponent, StatusChipComponent],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Destinations Board</h1>
      
      <div class="grid grid-cols-3 gap-4">
        <lib-card title="On-Prem" subtitle="On-Premise Deployments">
          <div class="space-y-2">
            <div class="p-4 border rounded">
              <h4 class="font-semibold">Product A v1.0</h4>
              <lib-status-chip status="in-review"></lib-status-chip>
            </div>
          </div>
        </lib-card>

        <lib-card title="XD" subtitle="XD Deployments">
          <div class="space-y-2">
            <div class="p-4 border rounded">
              <h4 class="font-semibold">Product B v2.0</h4>
              <lib-status-chip status="approved"></lib-status-chip>
            </div>
          </div>
        </lib-card>

        <lib-card title="Cloud" subtitle="Cloud Deployments">
          <div class="space-y-2">
            <div class="p-4 border rounded">
              <h4 class="font-semibold">Product C v1.5</h4>
              <lib-status-chip status="draft"></lib-status-chip>
            </div>
          </div>
        </lib-card>
      </div>
    </div>
  `,
})
export class DestinationsBoardComponent {}
