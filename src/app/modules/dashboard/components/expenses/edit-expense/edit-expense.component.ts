import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent {

  //INPUTS AND OUTPUTS
  @Output() btnBack = new EventEmitter<boolean>();
  @Output() btnSave = new EventEmitter<boolean>();

  getSave() {
    this.btnSave.emit(true);
  }

  getBack() {
    this.btnBack.emit(true);
  }

}
