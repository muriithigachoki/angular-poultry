import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-del-income',
  templateUrl: './del-income.component.html',
  styleUrls: ['./del-income.component.css'],
})
export class DelIncomeComponent {
  constructor(
    private farm: FarmService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  removeIncome() {
    this.farm.deleteIncome(this.data.id).subscribe((response) => {
      alert('Expense is deleted.');
    });
  }
}
