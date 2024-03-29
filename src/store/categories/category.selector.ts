import { createSelector } from "reselect";  //used for memoization ~ caching - creates memoized selector
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState):CategoriesState => state.categories;

//1st param - takes an array, the output of that, is used in second paramater
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories//this runs only if the selectCategoryReducer value (categories) is different
);
//implement memoization here as well. as long as categories does not change, do not run below code after []  
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => 
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
  }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);