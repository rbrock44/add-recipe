import { Component, ChangeDetectionStrategy, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {RecipeFormComponent} from './components/recipe-form/recipe-form.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RecipeFormComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'add-recipe';
  cameFromFamilyRecipes = false;
  readonly familyRecipesUrl = 'https://family-recipes.ryan-brock.com/';

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const queryParams = new URLSearchParams(window.location.search);
    const cameFromParam = queryParams.get('ref') === 'family-recipes';
    const cameFromReferrer = document.referrer.includes('family-recipes.ryan-brock.com');

    this.cameFromFamilyRecipes = cameFromParam || cameFromReferrer;
  }
}
