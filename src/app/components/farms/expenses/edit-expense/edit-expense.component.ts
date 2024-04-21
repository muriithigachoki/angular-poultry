import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css'],
})
export class EditExpenseComponent {
  editdata!: any;
  expenseForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private farm: FarmService,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm() {
    this.expenseForm = this.formbuilder.group({
      id: [{ value: '', disabled: true }],
      item: ['', Validators.required],
      amount: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.id !== '' && this.data.id !== null) {
      this.farm.getExpensesById(this.data.id).subscribe((response) => {
        this.editdata = response;
        this.expenseForm.setValue({
          id: this.editdata.id,
          item: this.editdata.item,
          amount: this.editdata.amount,
          date: this.editdata.date,
          description: this.editdata.description,
        });
      });
    }
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const editid = this.expenseForm.getRawValue().id;
      console.log(editid);
      console.log(this.expenseForm.getRawValue());
      this.farm.updateExpense(editid, this.expenseForm.getRawValue()).subscribe(
        (response) => {
          // Handle successful registration
          this.close();
          alert('Updated successfully');
        },
        (error) => {
          console.error('Registration error', error);
        }
      );
    }
  }

  close() {
    this.dialog.closeAll();
  }
}
