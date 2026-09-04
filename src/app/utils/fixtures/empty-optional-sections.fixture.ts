import {Recipe} from '../../models/recipe.interface';
import {RecipeFormValue} from '../recipe-transform';

// Messy case: every optional section left empty (no photo link, no
// additional links, no yield range or description) - matches the freshly
// reset form's default state plus one required ingredient.
export const input: RecipeFormValue = {
  name: 'Plain Toast',
  author: 'Sam Hooper',
  category: 7,
  instructions: 'Toast the bread.',
  ingredients: [
    { amount: 1, name: 'slice of bread' }
  ],
  yield: {
    amount: 0,
    upperAmount: null,
    name: ''
  },
  link: '',
  additionalLinks: []
};

export const expected: Recipe = {
  name: 'Plain Toast',
  author: 'Sam Hooper',
  category: 7,
  instructions: 'Toast the bread.',
  ingredients: [
    { amount: 1, name: 'slice of bread' }
  ],
  yield: {
    amount: 0,
    name: ''
  }
};
