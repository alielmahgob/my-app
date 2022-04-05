import { EventEmitter } from "@angular/core"
import { Ingredient } from "../shared/ingredient.model"
import { Recipe } from "./recipe.model"

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(0, "Test Recipe 1",
                  "this is simply a test", 
                  "https://i0.wp.com/www.bbcgoodfoodme.com/wp-content/uploads/2020/04/baked-courgette-tomato-gratin-800x180-1.jpg?w=800&ssl=1"
                  , [new Ingredient("Meat", 10), new Ingredient("French fries", 5)]),
        new Recipe(1, "Test Recipe 2", "this is simply a test", "https://i0.wp.com/www.bbcgoodfoodme.com/wp-content/uploads/2020/04/baked-courgette-tomato-gratin-800x180-1.jpg?w=800&ssl=1", [new Ingredient("Meat", 10)])
    ]

      getRecipes() {
        return this.recipes
      }

      getRecipe(id: number): Recipe {
        let recipe = this.recipes.find(recipe => id === recipe.id) 
        return recipe ? recipe : new Recipe(0, "", "", "", [])
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe
      }
}