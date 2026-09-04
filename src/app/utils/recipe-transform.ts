import {Recipe} from '../models/recipe.interface';

/**
 * Shape of RecipeFormComponent's reactive form value, mirrored here so the
 * transform can be tested without spinning up the component or its DI graph.
 */
export interface RecipeFormValue {
  name: string;
  author: string;
  category: number;
  instructions: string;
  ingredients: { amount: number | null; name: string }[];
  yield: {
    amount: number;
    upperAmount: number | null;
    name: string;
  };
  link: string;
  additionalLinks: string[];
}

/**
 * Converts a raw recipe form value into the JSON payload consumed by the
 * family-recipes backend: drops empty optional fields (link, additionalLinks,
 * yield.upperAmount) rather than sending them as blank/null.
 */
export function buildRecipePayload(formValue: RecipeFormValue): Recipe {
  const recipeData: Recipe = { ...formValue } as Recipe;

  if (!recipeData.link) {
    delete recipeData.link;
  }

  const additionalLinks = (formValue.additionalLinks || []).filter((link: string) => !!link);
  if (additionalLinks.length > 0) {
    recipeData.additionalLinks = additionalLinks;
  } else {
    delete recipeData.additionalLinks;
  }

  if (!recipeData.yield.upperAmount) {
    delete recipeData.yield.upperAmount;
  }

  return recipeData;
}
