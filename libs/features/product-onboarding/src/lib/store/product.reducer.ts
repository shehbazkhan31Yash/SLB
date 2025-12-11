import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { productAdapter, initialProductState } from './product.state';

export const productReducer = createReducer(
  initialProductState,
  on(ProductActions.loadProducts, (state) => ({ ...state, loading: true })),
  on(ProductActions.loadProductsSuccess, (state, { products }) =>
    productAdapter.setAll(products, { ...state, loading: false })
  ),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ProductActions.createProductSuccess, (state, { product }) =>
    productAdapter.addOne(product, state)
  ),
  on(ProductActions.updateProductSuccess, (state, { product }) =>
    productAdapter.updateOne({ id: product.id, changes: product }, state)
  ),
  on(ProductActions.deleteProductSuccess, (state, { id }) => productAdapter.removeOne(id, state))
);
