import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productAdapter } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('products');

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const selectAllProducts = createSelector(selectProductState, selectAll);

export const selectProductEntities = createSelector(selectProductState, selectEntities);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectProductsError = createSelector(selectProductState, (state) => state.error);
