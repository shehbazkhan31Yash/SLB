import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@alm-platform/ui';

@Component({
  standalone: true,
  imports: [CommonModule, CardComponent],
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <div class="dashboard-container">
      <h1 class="dashboard-title">Dashboard</h1>

      <div class="metrics-grid">
        <lib-card title="Lead Time" subtitle="Average processing time">
          <div class="metric-value blue">12.5 days</div>
          <p class="metric-change">↓ 15% from last month</p>
        </lib-card>

        <lib-card title="Monthly Throughput" subtitle="Products processed">
          <div class="metric-value green">48</div>
          <p class="metric-change">↑ 8% from last month</p>
        </lib-card>

        <lib-card title="First-Pass Approval" subtitle="Approval rate">
          <div class="metric-value purple">78%</div>
          <p class="metric-change">↑ 3% from last month</p>
        </lib-card>
      </div>

      <div class="content-grid">
        <lib-card title="Recent Activity" subtitle="Latest submissions">
          <div class="activity-list">
            <div class="activity-item">
              <div>
                <p class="activity-title">Product A v1.0</p>
                <p class="activity-subtitle">Submitted for review</p>
              </div>
              <span class="activity-time">2h ago</span>
            </div>
            <div class="activity-item">
              <div>
                <p class="activity-title">Product B v2.0</p>
                <p class="activity-subtitle">Approved</p>
              </div>
              <span class="activity-time">5h ago</span>
            </div>
          </div>
        </lib-card>

        <lib-card title="Pending Reviews" subtitle="Awaiting action">
          <div class="activity-list">
            <div class="activity-item pending">
              <div>
                <p class="activity-title">Product C v1.5</p>
                <p class="activity-subtitle">Security review pending</p>
              </div>
              <span class="activity-time">1d ago</span>
            </div>
            <div class="activity-item pending">
              <div>
                <p class="activity-title">Product D v3.0</p>
                <p class="activity-subtitle">Legal review pending</p>
              </div>
              <span class="activity-time">3d ago</span>
            </div>
          </div>
        </lib-card>
      </div>
    </div>
  `,
})
export class DashboardComponent {}
