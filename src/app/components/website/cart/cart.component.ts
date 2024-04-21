import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: [] = [];
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'quantity',
    'price',
    'total_price',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe((data: any) => {
      const dataArray = Array.isArray(data) ? data : data.results || [];
      this.dataSource = new MatTableDataSource<any>(dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
    (error: any) => {
      console.error('Error fetching cart item:', error);
    };
  }

  sumTotalPrices(): number {
    if (!this.dataSource || !Array.isArray(this.dataSource.data)) {
      return 0;
    }

    return this.dataSource.data.reduce((total: number, item: any) => {
      // Convert item.total_price to a number before adding to total
      return total + parseFloat(item.total_price);
    }, 0);
  }

  removeItem(itemId: string) {
    this.cartService.removeCartItem(itemId).subscribe(
      () => {
        // After successfully removing the item, update the cart items
        // by fetching the latest data from the server
        this.getCartItems();
      },
      (error: any) => {
        console.error('Error removing item:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
