import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from "./recipes/recipes.component"
import { ShoppingListComponent } from "./shopping-list/shopping-list.component"
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component"
import { RecipeNotFoundComponent } from "./recipes/recipe-not-found/recipe-not-found.component"
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component"

const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  { path: "recipes", component: RecipesComponent, 
  children: [
    { path: "", component: RecipeNotFoundComponent },
    { path: "new", component: RecipeEditComponent },
    { path: ":id", component: RecipeDetailComponent },
    { path: ":id/edit", component: RecipeEditComponent },
  ]
 },
  { path: "shopping-list", component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
