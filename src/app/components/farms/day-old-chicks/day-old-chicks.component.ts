import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-day-old-chicks',
  templateUrl: './day-old-chicks.component.html',
  styleUrls: ['./day-old-chicks.component.css'],
})
export class DayOldChicksComponent implements OnInit {
  dataSourece!: any;
  chicksOrderForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: FarmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createOrderForm();
  }

  createOrderForm() {
    this.chicksOrderForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [0, Validators.required],
      broilers: [false],
      kenbros: [false],
      layers: [false],
      location: ['', Validators.required],
      numberOfBirds: [0, Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.chicksOrderForm.valid) {
      console.log(this.chicksOrderForm.value);
      this.orderService
        .dayOldOrder(this.chicksOrderForm.value)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/']);
        });
    } else {
      console.log(this.chicksOrderForm.value);
      console.log(this.chicksOrderForm);
      console.log('form is invalid');
    }
  }
}
