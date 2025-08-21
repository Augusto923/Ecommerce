import { configureStore } from '@reduxjs/toolkit';
import shopReducer from '../features/shop/shopSlice';
import cartReducer from '../features/cart/cartSlice';
import { shopApi } from '../services/shop/shopApi';
import { userApi } from '../services/user/userApi';
import userReducer from '../features/user/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    user: userReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);

export default store;
