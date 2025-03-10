import {Yield} from './yield.interface';
import {Ingredient} from './ingredient.interface';

export interface Recipe {
  name: string;
  filename: string;
  author: string;
  category: number;
  instructions: string;
  ingredients: Ingredient[];
  yield: Yield;
}
