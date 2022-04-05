import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from "../../shared/ingredient.model"
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingForm: FormGroup
  startEditingSubscription: Subscription
  editMode: boolean = false
  toBeEditedIndex: number

  constructor(public shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
    })
    this.startEditingSubscription = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true
        this.toBeEditedIndex = index
        const {name, amount} = this.shoppingListService.getIngredient(index)
        this.shoppingForm.setValue({
          name, amount
        })
      }
    )
  }

  ngOnDestroy(): void {
      this.startEditingSubscription.unsubscribe()
  }
  
  
  onSubmit() {
    const { name, amount } = this.shoppingForm.value
    this.shoppingListService.onAdd(name, amount)
    this.shoppingForm.reset()
  }

  onEdit() {
    const { name, amount } = this.shoppingForm.value
    this.shoppingListService.onEdit(this.toBeEditedIndex, name, amount)
    this.shoppingForm.reset()
    this.editMode = false
  }

  onDelete() {
    this.shoppingListService.onDelete(this.toBeEditedIndex)
    this.editMode = false
    this.shoppingForm.reset()
  }
  
}
