import { Component } from '@angular/core';
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
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'add-recipe';
}
