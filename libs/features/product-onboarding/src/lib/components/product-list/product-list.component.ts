import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { DataTableComponent } from '@alm-platform/ui';
import { ProductActions, selectAllProducts, selectProductsLoading } from '../../store';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, DataTableComponent],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Products</h1>
        <button mat-raised-button color="primary" routerLink="create">Create Product</button>
      </div>

      <lib-data-table
        [dataSource]="(products$ | async) ?? []"
        [columns]="columns"
      ></lib-data-table>
    </div>
  `,
})
export class ProductListComponent implements OnInit {
  private store = inject(Store);

  products$ = this.store.select(selectAllProducts);
  loading$ = this.store.select(selectProductsLoading);

  columns = [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' },
  ];

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }
}
