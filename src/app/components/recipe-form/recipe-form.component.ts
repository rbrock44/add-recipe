import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {Recipe} from '../../models/recipe.interface';
import {CATEGORIES} from '../../models/category.enum';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';

type RuntimeAppConfig = {
  pendingRecipeUrl?: string;
  deleteRecipeToken?: string;
};

const runtimeConfig = (globalThis as typeof globalThis & { __APP_CONFIG__?: RuntimeAppConfig }).__APP_CONFIG__;

@Component({
  standalone: true,
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ]
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup = new FormGroup('');
  categories = CATEGORIES;
  isSaving = false;
  private readonly pendingRecipeUrl = runtimeConfig?.pendingRecipeUrl ?? 'https://family-recipes.ryan-brock.com/recipes/pending';
  private readonly deleteRecipeToken = runtimeConfig?.deleteRecipeToken?.trim() ?? '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      category: [0, Validators.min(1)], // Default to 0, but require > 0
      instructions: ['', Validators.required],
      ingredients: this.fb.array([this.createIngredient()]),
      yield: this.fb.group({
        amount: [0],
        name: ['']
      })
    });
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      amount: [null, Validators.required],
      name: ['', Validators.required]
    });
  }

  get ingredientsArray(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredientsArray.push(this.createIngredient());
  }

  removeIngredient(index: number): void {
    this.ingredientsArray.removeAt(index);
  }

  onSubmit(): void {
    if (!this.recipeForm.valid) {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.recipeForm);
      this.showNotification('Please fill in all required fields', 'error');
      return;
    }

    if (this.isSaving) {
      return;
    }

    const recipeData: Recipe = this.recipeForm.value;
    const headers = this.deleteRecipeToken
      ? new HttpHeaders({
          'X-API-Key': this.deleteRecipeToken
        })
      : undefined;

    this.isSaving = true;
    this.http.post(this.pendingRecipeUrl, recipeData, { headers }).subscribe({
      next: () => {
        this.isSaving = false;
        this.resetForm();
        this.showNotification('Recipe submitted for review. Thank you!');
      },
      error: (error: unknown) => {
        this.isSaving = false;
        console.error('Failed to submit recipe:', error);
        this.showNotification('Unable to save recipe right now. Please try again.', 'error');
      }
    });
  }

  // Recursively marks all controls in a form group as touched
  markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    if (formGroup instanceof FormGroup) {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        if (control instanceof FormGroup || control instanceof FormArray) {
          this.markFormGroupTouched(control);
        } else if (control) {
          control.markAsTouched();
        }
      });
    } else if (formGroup instanceof FormArray) {
      formGroup.controls.forEach((control: AbstractControl) => {
        if (control instanceof FormGroup || control instanceof FormArray) {
          this.markFormGroupTouched(control);
        } else {
          control.markAsTouched();
        }
      });
    }
  }

  showNotification(message: string, action: string = 'success') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: action === 'error' ? ['error-snackbar'] : ['success-snackbar']
    });
  }

  resetForm(): void {
    this.recipeForm.reset();
    // Clear ingredients array except for one empty ingredient
    while (this.ingredientsArray.length > 0) {
      this.ingredientsArray.removeAt(0);
    }
    this.addIngredient();
    // Reset default values
    this.recipeForm.patchValue({
      category: 0,
      yield: {
        amount: 0,
        name: ''
      }
    });
  }
}
