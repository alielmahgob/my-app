import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = new Recipe(0, "", "", "", [])

  constructor(public shoppingListService: ShoppingListService, 
              private router: ActivatedRoute,
              private recipesService: RecipeService) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipesService.getRecipe(+params['id'])
        console.log(this.recipe);
        
      }
    )
  }

}
