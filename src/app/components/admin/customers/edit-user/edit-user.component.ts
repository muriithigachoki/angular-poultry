import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editdata!: any;
  UserForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm() {
    this.UserForm = this.formbuilder.group({
      id: [{ value: '', disabled: true }],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      last_name: [''],
      first_name: [''],
      is_active: [''],
      is_superuser: [''],
    });
  }

  ngOnInit(): void {
    if (this.data.id !== '' && this.data.id !== null) {
      this.authService.getUserById(this.data.id).subscribe((response) => {
        this.editdata = response;
        this.UserForm.setValue({
          id: this.editdata.id,
          username: this.editdata.username,
          email: this.editdata.email,
          first_name: this.editdata.first_name,
          last_name: this.editdata.last_name,
          is_active: this.editdata.is_active,
          is_superuser: this.editdata.is_superuser,
        });
      });
    }
  }

  onSubmit() {
    if (this.UserForm.valid) {
      const editid = this.UserForm.getRawValue().id;
      this.authService
        .updateUser(editid, this.UserForm.getRawValue())
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
