import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-del-user',
  templateUrl: './del-user.component.html',
  styleUrls: ['./del-user.component.css'],
})
export class DelUserComponent {
  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  removeUser() {
    this.authService.deleteUser(this.data.id).subscribe((response) => {
      alert('user is deleted.');
    });
  }

  close() {
    this.dialog.closeAll();
  }
}
