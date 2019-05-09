import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShoppingComponent} from './shopping.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ShoppingModule {}
