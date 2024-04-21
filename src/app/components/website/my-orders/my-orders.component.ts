import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { OrderService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  dataSource!: any;
  total_products_price: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['customer', 'date', 'Action'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getorder();
  }

  getorder() {
    this.orderService.getOrders().subscribe(
      (data: any) => {
        const dataArray = Array.isArray(data) ? data : data.results || [];
        this.dataSource = new MatTableDataSource<any>(dataArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      (error: any) => {
        console.error('Error fetching cart item:', error);
      }
    );
  }
}
