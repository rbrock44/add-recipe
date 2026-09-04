import {Recipe} from '../../models/recipe.interface';
import {RecipeFormValue} from '../recipe-transform';

// Messy case: multi-line instructions (numbered steps entered into the
// textarea) and a long, multi-row ingredient list. Newlines must survive
// the transform untouched.
const instructions = [
  '1. Preheat oven to 350F.',
  '2. Cream butter and sugar.',
  '3. Beat in eggs one at a time.',
  '4. Fold in flour mixture.',
  '5. Bake for 25 minutes.'
].join('\n');

export const input: RecipeFormValue = {
  name: 'Yellow Layer Cake',
  author: 'Beth Hooper',
  category: 6,
  instructions,
  ingredients: [
    { amount: 2, name: 'cups sugar' },
    { amount: 1, name: 'cup butter' },
    { amount: 4, name: 'eggs' },
    { amount: 3, name: 'cups flour' },
    { amount: 1, name: 'cup milk' },
    { amount: 2, name: 'tsp vanilla' }
  ],
  yield: {
    amount: 12,
    upperAmount: null,
    name: 'slices'
  },
  link: '',
  additionalLinks: ['', 'https://example.com/photos/cake.jpg', '']
};

export const expected: Recipe = {
  name: 'Yellow Layer Cake',
  author: 'Beth Hooper',
  category: 6,
  instructions,
  ingredients: [
    { amount: 2, name: 'cups sugar' },
    { amount: 1, name: 'cup butter' },
    { amount: 4, name: 'eggs' },
    { amount: 3, name: 'cups flour' },
    { amount: 1, name: 'cup milk' },
    { amount: 2, name: 'tsp vanilla' }
  ],
  yield: {
    amount: 12,
    name: 'slices'
  },
  additionalLinks: ['https://example.com/photos/cake.jpg']
};
