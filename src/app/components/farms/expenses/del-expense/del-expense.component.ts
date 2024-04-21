import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-del-expense',
  templateUrl: './del-expense.component.html',
  styleUrls: ['./del-expense.component.css'],
})
export class DelExpenseComponent {
  constructor(
    private farm: FarmService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  removeExpense() {
    this.farm.deleteExpense(this.data.id).subscribe((response) => {
      alert('Expense is deleted.');
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
