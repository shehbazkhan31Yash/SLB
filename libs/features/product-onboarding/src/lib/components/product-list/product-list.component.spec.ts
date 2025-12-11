import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [provideMockStore({ initialState: { products: { ids: [], entities: {} } } })],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProducts on init', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    // Add spy assertions here
  });
});
