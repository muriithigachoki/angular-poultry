import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  addUserForm!: FormGroup;
  editdata!: any;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.data.id !== '' && this.data.id !== null) {
      this.authService.getUserById(this.data.id).subscribe((response) => {
        this.editdata = response;
        this.addUserForm.setValue({
          id: this.editdata.id,
          username: this.editdata.username,
          email: this.editdata.email,
          password: this.editdata.password,
          first_name: this.editdata.first_name,
          last_name: this.editdata.last_name,
          is_active: this.editdata.is_active,
          is_superuser: this.editdata.is_superuser,
        });
      });
    }
  }

  createForm() {
    this.addUserForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      this.authService.registerUser(this.addUserForm.value).subscribe(
        (response) => {
          // Handle successful registration
          this.close();
          alert('Added successfully');
          this.router.navigate(['user']);
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
