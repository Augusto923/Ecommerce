import { createSlice } from "@reduxjs/toolkit";
import categories from "../../data/categories.json";
import products from "../../data/products.json";

const shopSlice = createSlice({
  name: "shop",
  initialState: {categories,products,categorySelected: "",productsFilteredByCategory: [],productSelected: null,},
  reducers: {
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload;

      state.productsFilteredByCategory = state.products.filter(
        (product) =>
          product.category.toLowerCase() === action.payload.toLowerCase()
      );
    },
    setProductSelected: (state, action) => {
      state.productSelected = action.payload;
    },
    filterProductsByKeyword: (state, action) => {
      const keyword = action.payload.toLowerCase();
      
      state.productsFilteredByCategory = state.products.filter(
        (product) =>
          product.category.toLowerCase() === state.categorySelected.toLowerCase() &&
          product.title.toLowerCase().includes(keyword)
      );
    },
  },
});

export const {
  setCategorySelected,
  setProductSelected,
  filterProductsByKeyword,
} = shopSlice.actions;

export default shopSlice.reducer;
