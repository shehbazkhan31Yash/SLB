import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss'],
  template: `
    <mat-toolbar color="primary" class="app-toolbar">
      <button mat-icon-button (click)="drawer.toggle()" aria-label="Toggle navigation menu">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="app-toolbar-title">ALM Platform</span>
    </mat-toolbar>

    <mat-sidenav-container class="app-sidenav-container">
      <mat-sidenav #drawer mode="side" opened class="app-sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="mat-list-item-active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/products" routerLinkActive="mat-list-item-active">
            <mat-icon matListItemIcon>inventory</mat-icon>
            <span matListItemTitle>Products</span>
          </a>
          <a mat-list-item routerLink="/versions" routerLinkActive="mat-list-item-active">
            <mat-icon matListItemIcon>history</mat-icon>
            <span matListItemTitle>Versions</span>
          </a>
          <a mat-list-item routerLink="/destinations" routerLinkActive="mat-list-item-active">
            <mat-icon matListItemIcon>place</mat-icon>
            <span matListItemTitle>Destinations</span>
          </a>
          <a mat-list-item routerLink="/qualification" routerLinkActive="mat-list-item-active">
            <mat-icon matListItemIcon>checklist</mat-icon>
            <span matListItemTitle>Qualification</span>
          </a>
          <a mat-list-item routerLink="/reviewer" routerLinkActive="mat-list-item-active">
            <mat-icon matListItemIcon>rate_review</mat-icon>
            <span matListItemTitle>Reviewer Console</span>
          </a>
          <a mat-list-item routerLink="/market-material" routerLinkActive="mat-list-item-active">
            <mat-icon matListItemIcon>description</mat-icon>
            <span matListItemTitle>Market Material</span>
          </a>
          <a mat-list-item routerLink="/commercial" routerLinkActive="mat-list-item-active">
            <mat-icon matListItemIcon>attach_money</mat-icon>
            <span matListItemTitle>Commercial</span>
          </a>
          <a mat-list-item routerLink="/legal" routerLinkActive="mat-list-item-active">
            <mat-icon matListItemIcon>gavel</mat-icon>
            <span matListItemTitle>Legal</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="app-content">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class AppComponent {}
