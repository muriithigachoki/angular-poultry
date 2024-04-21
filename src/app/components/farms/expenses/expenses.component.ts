import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FarmService } from 'src/app/services/farm.service';
import { DelExpenseComponent } from './del-expense/del-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent {
  constructor(
    private farm: FarmService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'item',
    'amount',
    'date',
    'description',
    'update',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getExpenses();
  }
  getExpenses() {
    this.farm.getExpenses().subscribe(
      (data: any) => {
        const dataArray = Array.isArray(data) ? data : data.results || [];
        this.dataSource = new MatTableDataSource<any>(dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      (error) => {
        console.error('Error fetching incomes:', error);
      }
    );
  }

  updateExpense(id: any) {
    this.openDialog(EditExpenseComponent, id);
  }

  removeExpense(id: any) {
    this.openDialog(DelExpenseComponent, id);
  }

  openDialog(component: any, id: any): void {
    const popup = this.dialog.open(component, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { id },
    });

    popup.afterClosed().subscribe(() => {
      this.getExpenses();
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
