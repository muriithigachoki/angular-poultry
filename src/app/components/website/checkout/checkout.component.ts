import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0;
  dataSource: any;
  displayedColumns: string[] = ['productName', 'price'];
  orderForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formbuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService
  ) {
    this.createForm();
  }

  createForm() {
    this.orderForm = this.formbuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phone_number: ['', Validators.required],
      amount: [0, Validators.required],
    });
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe((data: any) => {
      const dataArray = Array.isArray(data) ? data : data.results || [];
      this.dataSource = new MatTableDataSource<any>(dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      (error: any) => {
        console.error('Error fetching users:', error);
      };
    });
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

  ngOnInit(): void {
    this.createForm();
    this.getCartItems();
  }

  placeOrder(): void {
    if (this.orderForm.valid) {
      const orderData = {
        name: this.orderForm.value.name,
        address: this.orderForm.value.address,
        city: this.orderForm.value.city,
        phone_number: this.orderForm.value.phone_number,
        amount: this.sumTotalPrices(),
        total_products_price: this.sumTotalPrices(),
        orderSummary: this.dataSource.data,
      };

      console.log(orderData);

      this.orderService.placeOrder(orderData).subscribe(
        (response) => {
          console.log('Order placed successfully', response);
          // Optionally, handle success here
        },
        (error) => {
          console.log(error);
          // this.orderService.handleOrderError(error);
        }
      );
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
