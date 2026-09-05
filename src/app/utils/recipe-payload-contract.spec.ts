import Ajv, {ValidateFunction} from 'ajv';

import {buildRecipePayload} from './recipe-transform';
import schema from './family-recipes-recipe.schema.json';

import * as normalRecipe from './fixtures/normal-recipe.fixture';
import * as missingQuantity from './fixtures/missing-quantity.fixture';
import * as fractionAmounts from './fixtures/fraction-amounts.fixture';
import * as multilineInstructions from './fixtures/multiline-instructions.fixture';
import * as unusualUnits from './fixtures/unusual-units.fixture';
import * as emptyOptionalSections from './fixtures/empty-optional-sections.fixture';

// Confirms the JSON this app produces can actually be read by family-recipes.
// family-recipes-recipe.schema.json is a committed, hand-written mirror of the
// Recipe/Ingredient/Yield interfaces in family-recipes' src/app/models and of
// what RecipeReaderService#convertRecipe does with the parsed JSON - see that
// schema file for the source-of-truth references.
describe('buildRecipePayload output against the family-recipes contract', () => {
  const ajv = new Ajv({allErrors: true});
  const validate: ValidateFunction = ajv.compile(schema);

  // Every one of these fixtures represents a form value that reactive-forms
  // validation actually allows through to onSubmit (every required control
  // filled in) - i.e. real payloads the running app can send.
  const validSubmissions: { name: string; fixture: { input: any } }[] = [
    { name: 'a fully filled out recipe', fixture: normalRecipe },
    { name: 'ingredient and yield amounts entered as fractions', fixture: fractionAmounts },
    { name: 'multi-line instructions and a long ingredient list', fixture: multilineInstructions },
    { name: 'ingredients with unusual, free-text units', fixture: unusualUnits },
    { name: 'every optional section left empty', fixture: emptyOptionalSections }
  ];

  validSubmissions.forEach(({ name, fixture }) => {
    it(`produces JSON that satisfies the family-recipes recipe schema for ${name}`, () => {
      const payload = buildRecipePayload(fixture.input);

      const valid = validate(payload);

      expect(valid).withContext(JSON.stringify(validate.errors)).toBe(true);
    });
  });

  // Documents a known, real gap rather than hiding it: recipe-form.component's
  // amount FormControl carries Validators.required, so the running app never
  // calls buildRecipePayload while an ingredient amount is null - onSubmit
  // bails out first. But buildRecipePayload itself performs no such check
  // (see missing-quantity.fixture.ts), so if it's ever called directly, or
  // that guard is ever removed, it will silently emit JSON that violates the
  // shape family-recipes expects (Ingredient.amount is a required number,
  // never null). This test pins that gap down instead of leaving it implicit.
  it('emits a payload that fails the schema when given an unvalidated null ingredient amount', () => {
    const payload = buildRecipePayload(missingQuantity.input);

    const valid = validate(payload);

    expect(valid).toBe(false);
  });
});
