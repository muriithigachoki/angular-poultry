import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DelUserComponent } from './del-user/del-user.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'first_name',
    'last_name',
    'is_active',
    'is_superuser',
    'action',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getUsers().subscribe(
      (data: any) => {
        const dataArray = Array.isArray(data) ? data : data.results || [];
        this.dataSource = new MatTableDataSource<any>(dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  updateUser(id: any) {
    this.openDialog(EditUserComponent, id);
  }

  addUser(id: any) {
    this.openDialog(AddUserComponent, id);
  }

  removeUser(id: any) {
    this.openDialog(DelUserComponent, id);
  }

  openDialog(component: any, id: any): void {
    const popup = this.dialog.open(component, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { id },
    });

    popup.afterClosed().subscribe(() => {
      this.getAllUsers();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
