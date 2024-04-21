import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-edit-farm',
  templateUrl: './edit-farm.component.html',
  styleUrls: ['./edit-farm.component.css'],
})
export class EditFarmComponent implements OnInit {
  editdata!: any;
  farmForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private farmService: FarmService,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm() {
    this.farmForm = this.formbuilder.group({
      id: [{ value: '', disabled: true }],
      user: [{ value: '', disabled: true }],
      farm_name: ['', Validators.required],
      location: ['', Validators.required],
      establishment_date: ['', Validators.required],
      contact_person: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      contact_phone: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.id !== '' && this.data.id !== null) {
      this.farmService.getFarmById(this.data.id).subscribe((response) => {
        this.editdata = response;
        this.farmForm.setValue({
          id: this.editdata.id,
          user: this.editdata.user,
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

  onSubmit() {
    if (this.farmForm.valid) {
      const editid = this.farmForm.getRawValue().id;
      this.farmService
        .updateFarm(editid, this.farmForm.getRawValue())
        .subscribe(
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
