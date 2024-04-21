import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId!:number;
  orderDetails!: any
  totalProductsPrice: number = 0;

  constructor(private route: ActivatedRoute, private orderService: OrderService){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
      this.getOrderById();
    });
  }

  getOrderById(){
    this.orderService.getOrdersById(this.orderId).subscribe((res:any)=>{
      this.orderDetails = res.orderSummary
      this.totalProductsPrice = res.total_products_price
      console.log(this.totalProductsPrice)
    })
  }
}
