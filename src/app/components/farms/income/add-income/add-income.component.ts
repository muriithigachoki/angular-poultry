import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css'],
})
export class AddIncomeComponent implements OnInit {
  incomeForm!: FormGroup;

  sourceOptions = [
    { label: 'Eggs', value: 'eggs' },
    { label: 'Chickens', value: 'chickens' },
    { label: 'Manure', value: 'manure' },
    { label: 'Other Poultry Products', value: 'other' },
  ];

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: FarmService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.incomeForm = this.formbuilder.group({
      source: ['', Validators.required],
      sale_date: [new Date().toISOString().split('T')[0], Validators.required],
      quantity: ['', Validators.required],
      amount_per_item: ['', Validators.required],
      total_amount: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('clicked');
    if (this.incomeForm.valid) {
      console.log(this.incomeForm.value);
      this.service.addIncomes(this.incomeForm.value).subscribe(
        (response) => {
          console.log('Income data pushed successfully:', response);
          // Reset the form after successful submission
          this.router.navigate(['/incomes']);
          this.incomeForm.reset();
        },
        (error) => {
          console.error('Error pushing income data:', error);
          // Handle error response here
        }
      );
    }
  }
}
