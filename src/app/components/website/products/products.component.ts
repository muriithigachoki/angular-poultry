import { Component, DoCheck, OnInit } from '@angular/core';
import { Product } from 'src/app/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productlist!: any[];
  categoryList!: any[];
  cartItems!: any[];
  selectedCategory!: number;

  constructor(
    private productsservice: ProductsService,
    private cartService: CartService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getcartitems();
  }

  getcartitems() {
    this.cartService.getCartItems().subscribe((response: any) => {
      this.cartItems = response;
      console.log(response);
    });
  }

  getCategories() {
    this.productsservice.getcategories().subscribe((response: any) => {
      this.categoryList = response;
      // console.log(this.categoryList);
    });
  }

  getProducts() {
    this.productsservice.getProducts().subscribe((response: any) => {
      this.productlist = response;
      console.log(response);
    });
  }

  filterProductsByCategory(category: number) {
    this.selectedCategory = category;
    console.log(category);
  }

  addToCart(product: any) {
    const existingCartItemIndex = this.cartItems.findIndex(
      (item) => item.name === product.name
    );

    if (existingCartItemIndex !== -1) {
      const existingCartItem = this.cartItems[existingCartItemIndex];
      existingCartItem.quantity++;
      if (
        existingCartItem.id !== undefined &&
        existingCartItem.quantity !== undefined
      ) {
        this.cartService
          .updateCartItemQuantity(
            existingCartItem.user,
            existingCartItem.id,
            existingCartItem.name,
            existingCartItem.product,
            existingCartItem.price,
            existingCartItem.quantity
          )
          .subscribe(
            () => {
              console.log('Product quantity updated in cart.');
            },
            (error) => {
              console.error(
                'Failed to update product quantity in cart:',
                error
              );
            }
          );
      } else {
        console.error('Existing cart item has undefined ID or quantity.');
      }
    } else {
      this.cartService.addToCart(product).subscribe(
        () => {
          console.log('Product added to cart successfully.');
          this.getcartitems();
        },
        (error) => {
          console.error('Failed to add product to cart:', error);
        }
      );
    }
  }
}
