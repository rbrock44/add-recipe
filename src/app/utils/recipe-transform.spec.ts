import {buildRecipePayload} from './recipe-transform';

import * as normalRecipe from './fixtures/normal-recipe.fixture';
import * as missingQuantity from './fixtures/missing-quantity.fixture';
import * as fractionAmounts from './fixtures/fraction-amounts.fixture';
import * as multilineInstructions from './fixtures/multiline-instructions.fixture';
import * as unusualUnits from './fixtures/unusual-units.fixture';
import * as emptyOptionalSections from './fixtures/empty-optional-sections.fixture';

describe('buildRecipePayload', () => {
  const goldenCases: { name: string; fixture: { input: any; expected: any } }[] = [
    { name: 'a fully filled out recipe', fixture: normalRecipe },
    { name: 'an ingredient with a missing quantity', fixture: missingQuantity },
    { name: 'ingredient and yield amounts entered as fractions', fixture: fractionAmounts },
    { name: 'multi-line instructions and a long ingredient list', fixture: multilineInstructions },
    { name: 'ingredients with unusual, free-text units', fixture: unusualUnits },
    { name: 'every optional section left empty', fixture: emptyOptionalSections }
  ];

  goldenCases.forEach(({ name, fixture }) => {
    it(`matches the golden output for ${name}`, () => {
      const result = buildRecipePayload(fixture.input);

      expect(result).toEqual(fixture.expected);
    });
  });

  it('does not mutate the form value it is given', () => {
    const before = JSON.parse(JSON.stringify(normalRecipe.input));

    buildRecipePayload(normalRecipe.input);

    expect(normalRecipe.input).toEqual(before);
  });

  it('omits link when it is an empty string', () => {
    const result = buildRecipePayload({ ...emptyOptionalSections.input, link: '' });

    expect(result.link).toBeUndefined();
  });

  it('keeps link when it is a non-empty string', () => {
    const result = buildRecipePayload({ ...emptyOptionalSections.input, link: 'https://example.com/a.jpg' });

    expect(result.link).toBe('https://example.com/a.jpg');
  });

  it('filters blank entries out of additionalLinks', () => {
    const result = buildRecipePayload({
      ...emptyOptionalSections.input,
      additionalLinks: ['', 'https://example.com/a.jpg', '', 'https://example.com/b.jpg']
    });

    expect(result.additionalLinks).toEqual(['https://example.com/a.jpg', 'https://example.com/b.jpg']);
  });

  it('omits additionalLinks entirely when every entry is blank', () => {
    const result = buildRecipePayload({ ...emptyOptionalSections.input, additionalLinks: ['', ''] });

    expect(result.additionalLinks).toBeUndefined();
  });

  it('omits yield.upperAmount when it is null', () => {
    const result = buildRecipePayload(emptyOptionalSections.input);

    expect(result.yield.upperAmount).toBeUndefined();
  });

  it('keeps yield.upperAmount when it is a positive number', () => {
    const result = buildRecipePayload({
      ...emptyOptionalSections.input,
      yield: { amount: 6, upperAmount: 8, name: 'servings' }
    });

    expect(result.yield.upperAmount).toBe(8);
  });
});
