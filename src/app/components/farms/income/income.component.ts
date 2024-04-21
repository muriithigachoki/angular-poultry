import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FarmService } from 'src/app/services/farm.service';
import { AddFarmComponent } from '../add-farm/add-farm.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { DelIncomeComponent } from './del-income/del-income.component';
import { ActivatedRoute } from '@angular/router';
// import { AddIncomeComponent } from './add-income/add-income.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit {
  constructor(
    private farm: FarmService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'source',
    'sale_date',
    'quantity',
    'amount_per_item',
    'total_amount',
    'update',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getIncomes();
  }

  getIncomes() {
    this.farm.getIncomes().subscribe(
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

  updateIncome(id: any) {
    this.openDialog(EditIncomeComponent, id);
  }

  removeIncome(id: any) {
    this.openDialog(DelIncomeComponent, id);
  }

  openDialog(component: any, id: any): void {
    const popup = this.dialog.open(component, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { id },
    });

    popup.afterClosed().subscribe(() => {
      this.getIncomes();
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
