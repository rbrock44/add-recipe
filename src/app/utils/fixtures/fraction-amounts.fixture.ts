import {Recipe} from '../../models/recipe.interface';
import {RecipeFormValue} from '../recipe-transform';

// Messy case: amounts entered as decimal fractions (the amount input steps
// by 0.25, so "1/4 cup" becomes 0.25, "1 1/2 cups" becomes 1.5, etc).
export const input: RecipeFormValue = {
  name: 'Buttermilk Biscuits',
  author: 'Nan Hooper',
  category: 5,
  instructions: 'Cut butter into flour. Add buttermilk. Fold gently.',
  ingredients: [
    { amount: 2.75, name: 'cups flour' },
    { amount: 0.25, name: 'cup cold butter' },
    { amount: 1.5, name: 'cups buttermilk' },
    { amount: 0.125, name: 'tsp salt' }
  ],
  yield: {
    amount: 8,
    upperAmount: null,
    name: 'biscuits'
  },
  link: '',
  additionalLinks: []
};

export const expected: Recipe = {
  name: 'Buttermilk Biscuits',
  author: 'Nan Hooper',
  category: 5,
  instructions: 'Cut butter into flour. Add buttermilk. Fold gently.',
  ingredients: [
    { amount: 2.75, name: 'cups flour' },
    { amount: 0.25, name: 'cup cold butter' },
    { amount: 1.5, name: 'cups buttermilk' },
    { amount: 0.125, name: 'tsp salt' }
  ],
  yield: {
    amount: 8,
    name: 'biscuits'
  }
};
