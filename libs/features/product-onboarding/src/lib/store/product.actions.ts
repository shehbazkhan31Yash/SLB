import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '@alm-platform/api';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),
    'Load Product': props<{ id: string }>(),
    'Load Product Success': props<{ product: Product }>(),
    'Create Product': props<{ product: Partial<Product> }>(),
    'Create Product Success': props<{ product: Product }>(),
    'Update Product': props<{ id: string; product: Partial<Product> }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Delete Product': props<{ id: string }>(),
    'Delete Product Success': props<{ id: string }>(),
  },
});
