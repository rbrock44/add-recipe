import {Recipe} from '../../models/recipe.interface';
import {RecipeFormValue} from '../recipe-transform';

// Messy case: ingredient names carrying unusual or free-text units (there
// is no dedicated unit field - the unit lives inside the name string, so
// the transform must pass it through byte-for-byte).
export const input: RecipeFormValue = {
  name: 'Old-Fashioned Stew',
  author: 'Walt Hooper',
  category: 3,
  instructions: 'Combine everything in a Dutch oven and simmer for 3 hours.',
  ingredients: [
    { amount: 1, name: 'pinch of saffron' },
    { amount: 1, name: 'knob of butter' },
    { amount: 3, name: 'dashes of Worcestershire sauce' },
    { amount: 1, name: 'smidge of nutmeg' },
    { amount: 2, name: 'glugs of red wine' }
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
  name: 'Old-Fashioned Stew',
  author: 'Walt Hooper',
  category: 3,
  instructions: 'Combine everything in a Dutch oven and simmer for 3 hours.',
  ingredients: [
    { amount: 1, name: 'pinch of saffron' },
    { amount: 1, name: 'knob of butter' },
    { amount: 3, name: 'dashes of Worcestershire sauce' },
    { amount: 1, name: 'smidge of nutmeg' },
    { amount: 2, name: 'glugs of red wine' }
  ],
  yield: {
    amount: 0,
    name: ''
  }
};
