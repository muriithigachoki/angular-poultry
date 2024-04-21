import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.css'],
})
export class AddFarmComponent implements OnInit {
  addFarmForm!: FormGroup;
  editdata!: any;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private farm: FarmService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.data.id !== '' && this.data.id !== null) {
      this.farm.getFarmById(this.data.id).subscribe((response) => {
        this.editdata = response;
        this.addFarmForm.setValue({
          id: this.editdata.id,
          farm_name: this.editdata.farm_name,
          location: this.editdata.location,
          establishment_date: this.editdata.establishment_date,
          contact_person: this.editdata.contact_person,
          contact_email: this.editdata.contact_email,
          contact_phone: this.editdata.contact_phone,
          description: this.editdata.description,
        });
      });
    }
  }

  createForm() {
    this.addFarmForm = this.formbuilder.group({
      farm_name: ['', Validators.required],
      location: ['', Validators.required],
      establishment_date: [
        new Date().toISOString().split('T')[0],
        Validators.required,
      ],
      contact_person: ['', Validators.required],
      contact_email: [''],
      contact_phone: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addFarmForm.valid) {
      this.farm.createFarms(this.addFarmForm.value).subscribe(
        (response) => {
          // Handle successful registration
          this.close();
          alert('Added successfully');
          this.router.navigate(['farms']);
        },
        (error) => {
          // Handle registration error
          console.error('Registration error', error);
        }
      );
    }
  }

  close() {
    this.dialog.closeAll();
  }
}
