import {Recipe} from '../../models/recipe.interface';
import {RecipeFormValue} from '../recipe-transform';

// Normal case: every field filled in, including both optional link fields
// and a yield range.
export const input: RecipeFormValue = {
  name: 'Grandma\'s Pot Roast',
  author: 'Ruth Hooper',
  category: 3,
  instructions: 'Sear the roast on all sides. Add vegetables and broth. Braise low and slow for 4 hours.',
  ingredients: [
    { amount: 3, name: 'lbs chuck roast' },
    { amount: 4, name: 'carrots, chopped' },
    { amount: 2, name: 'cups beef broth' }
  ],
  yield: {
    amount: 6,
    upperAmount: 8,
    name: 'servings'
  },
  link: 'https://example.com/photos/pot-roast.jpg',
  additionalLinks: ['https://example.com/photos/pot-roast-2.jpg']
};

export const expected: Recipe = {
  name: 'Grandma\'s Pot Roast',
  author: 'Ruth Hooper',
  category: 3,
  instructions: 'Sear the roast on all sides. Add vegetables and broth. Braise low and slow for 4 hours.',
  ingredients: [
    { amount: 3, name: 'lbs chuck roast' },
    { amount: 4, name: 'carrots, chopped' },
    { amount: 2, name: 'cups beef broth' }
  ],
  yield: {
    amount: 6,
    upperAmount: 8,
    name: 'servings'
  },
  link: 'https://example.com/photos/pot-roast.jpg',
  additionalLinks: ['https://example.com/photos/pot-roast-2.jpg']
};
