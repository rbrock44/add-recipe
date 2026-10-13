import {Recipe} from '../../models/recipe.interface';
import {RecipeFormValue} from '../recipe-transform';

// Messy case: ingredient names carrying unusual or free-text units. Only
// leading words that are known units ("pinch", "dashes") move into `unit`,
// exactly as family-recipes' splitIngredientUnits would; the rest ("knob",
// "smidge", "glugs") stay in the name byte-for-byte.
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
    { amount: 1, unit: 'pinch', name: 'of saffron' },
    { amount: 1, name: 'knob of butter' },
    { amount: 3, unit: 'dash', name: 'of Worcestershire sauce' },
    { amount: 1, name: 'smidge of nutmeg' },
    { amount: 2, name: 'glugs of red wine' }
  ],
  yield: {
    amount: 0,
    name: ''
  }
};
