import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/website/products/products.component';
import { CartComponent } from './components/website/cart/cart.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { CheckoutComponent } from './components/website/checkout/checkout.component';
import { MyOrdersComponent } from './components/website/my-orders/my-orders.component';
import { OrderDetailsComponent } from './components/website/my-orders/order-details/order-details.component';
import { AuthGuard } from './guard/auth.guard';
import { FarmsComponent } from './components/farms/farms/farms.component';
import { LayoutComponent } from './components/layout/layout.component';
import { InventoryComponent } from './components/farms/inventory/inventory.component';
import { IncomeComponent } from './components/farms/income/income.component';
import { ExpensesComponent } from './components/farms/expenses/expenses.component';
import { AddIncomeComponent } from './components/farms/income/add-income/add-income.component';
import { AddExpensesComponent } from './components/farms/expenses/add-expenses/add-expenses.component';
import { DayOldChicksComponent } from './components/farms/day-old-chicks/day-old-chicks.component';
import { EditFarmComponent } from './components/farms/farms/edit-farm/edit-farm.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user', component: CustomersComponent, canActivate: [AuthGuard] },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'incomes', component: IncomeComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'add-income', component: AddIncomeComponent },
      { path: 'add-expense', component: AddExpensesComponent },
      { path: 'day-old-chick', component: DayOldChicksComponent },
      {
        path: 'myorders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orders/:id',
        component: OrderDetailsComponent,
        canActivate: [AuthGuard],
      },

      { path: 'farms', component: FarmsComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
