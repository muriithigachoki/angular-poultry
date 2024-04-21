import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css'],
})
export class EditIncomeComponent {
  editdata!: any;
  incomeForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private farm: FarmService,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm() {
    this.incomeForm = this.formbuilder.group({
      id: [{ value: '', disabled: true }],
      source: ['', Validators.required],
      sale_date: [new Date().toISOString().split('T')[0], Validators.required],
      quantity: ['', Validators.required],
      amount_per_item: ['', Validators.required],
      total_amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.id !== '' && this.data.id !== null) {
      this.farm.getIncomesById(this.data.id).subscribe((response) => {
        this.editdata = response;
        this.incomeForm.setValue({
          id: this.editdata.id,
          source: this.editdata.source,
          sale_date: this.editdata.sale_date,
          quantity: this.editdata.quantity,
          amount_per_item: this.editdata.amount_per_item,
          total_amount: this.editdata.total_amount,
        });
      });
    }
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const editid = this.incomeForm.getRawValue().id;
      console.log(editid);
      console.log(this.incomeForm.getRawValue());
      this.farm.updateIncome(editid, this.incomeForm.getRawValue()).subscribe(
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
