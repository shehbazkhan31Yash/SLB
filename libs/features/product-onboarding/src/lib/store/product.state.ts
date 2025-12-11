import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '@alm-platform/api';

export interface ProductState extends EntityState<Product> {
  selectedProductId: string | null;
  loading: boolean;
  error: string | null;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialProductState: ProductState = productAdapter.getInitialState({
  selectedProductId: null,
  loading: false,
  error: null,
});
