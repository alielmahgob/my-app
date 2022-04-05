import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id:number
  editMode:boolean = false
  recipeForm: FormGroup

  constructor(private router: Router, private route: ActivatedRoute, private rs: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = Boolean(params['id'])
      this.initForm()   
    })
  }

  private initForm() {
    let recipeName: string = ""
    let recipeDescription: string = ""
    let recipeImagePath: string = ""
    let recipeIngredients = new FormArray([])
    
    if (this.editMode) {
      const recipe: Recipe = this.rs.getRecipe(this.id)
      recipeName = recipe.name
      recipeDescription = recipe.description
      recipeImagePath = recipe.imagePath
      if (recipe['ingredients']) {
        recipe.ingredients.map(ingredient => {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.pattern(/^[1-9]+[0-9]*$/) , Validators.required]),
            })
          )
        })
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.pattern(/^[1-9]+[0-9]*$/) , Validators.required]),
    }))
  }

  onSubmit() {
    const { name, description, imagePath, ingredients } = this.recipeForm.value
    if (this.editMode) {
      this.rs.updateRecipe(this.id, new Recipe(this.id, name, description, imagePath, ingredients))
    } else {
      this.rs.addRecipe(new Recipe(this.rs.getRecipes().length, name, description, imagePath, ingredients))
    }
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
