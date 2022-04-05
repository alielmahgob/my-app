import { Subject } from "rxjs"
import { Ingredient } from "../shared/ingredient.model"

export class ShoppingListService {
    startEditing = new Subject<number>() 
    private ingredients: Ingredient[] = [
        new Ingredient("Apple", 5),
        new Ingredient("Potato", 15),
    ]

    getIngredients() {
        return this.ingredients
    }
    getIngredient(index: number) {
        return this.ingredients[index]
    }

    onAdd(name:string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount))
    }

    onEdit(index: number, name:string, amount: number) {
        this.ingredients[index] = new Ingredient(name, amount)
    }

    onDelete(index: number) {
        this.ingredients.splice(index, 1)
    }

    onAddIngredients(ingredients: Ingredient[]) {
        this.ingredients = [ ...this.ingredients, ...ingredients ]
    }
}