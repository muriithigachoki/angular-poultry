import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css'],
})
export class AddExpensesComponent {
  expensesForm!: FormGroup;

  farmSources!: any[];

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: FarmService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getfarms();
  }

  getfarms() {
    this.service.getFarms().subscribe((response) => {
      this.farmSources = response;
    });
  }
  sourceOptions = [
    { label: 'Drugs', value: 'drugs' },
    { label: 'Feeding Brooders', value: 'feeding_brooders' },
    { label: 'Feeds', value: 'feeds' },
    { label: 'Labour', value: 'labour' },
    { label: 'Maintenance Costs', value: 'maintenance_costs' },
    { label: 'Poultry Farm Equipment', value: 'equipment' },
    { label: 'Other', value: 'other' },
  ];

  createForm() {
    this.expensesForm = this.formbuilder.group({
      item: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('clicked');

    console.log(this.expensesForm.value);
    if (this.expensesForm.valid) {
      console.log(this.expensesForm.value);
      this.service.addExpenses(this.expensesForm.value).subscribe(
        (response) => {
          console.log('Income data pushed successfully:', response);
          // Reset the form after successful submission
          this.router.navigate(['/expenses']);
          this.expensesForm.reset();
        },
        (error) => {
          console.error('Error pushing income data:', error);
          // Handle error response here
        }
      );
    }
  }
}
