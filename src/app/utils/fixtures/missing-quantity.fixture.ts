import {Recipe} from '../../models/recipe.interface';
import {RecipeFormValue} from '../recipe-transform';

// Messy case: an ingredient with no quantity entered (e.g. "salt to taste").
// The transform does not enforce validation - it should pass the null
// amount through unchanged and let form validation handle rejecting it.
export const input: RecipeFormValue = {
  name: 'Simple Vinaigrette',
  author: 'Tom Hooper',
  category: 2,
  instructions: 'Whisk everything together.',
  ingredients: [
    { amount: 0.5, name: 'cup olive oil' },
    { amount: null, name: 'salt to taste' },
    { amount: null, name: 'pepper to taste' }
  ],
  yield: {
    amount: 1,
    upperAmount: null,
    name: 'cup'
  },
  link: '',
  additionalLinks: []
};

export const expected: Recipe = {
  name: 'Simple Vinaigrette',
  author: 'Tom Hooper',
  category: 2,
  instructions: 'Whisk everything together.',
  ingredients: [
    { amount: 0.5, name: 'cup olive oil' },
    { amount: null as unknown as number, name: 'salt to taste' },
    { amount: null as unknown as number, name: 'pepper to taste' }
  ],
  yield: {
    amount: 1,
    name: 'cup'
  }
};
