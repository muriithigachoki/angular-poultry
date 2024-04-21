import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/website/products/products.component';
import { FooterComponent } from './components/website/footer/footer.component';
import { CartComponent } from './components/website/cart/cart.component';
import { CheckoutComponent } from './components/website/checkout/checkout.component';
import { MyOrdersComponent } from './components/website/my-orders/my-orders.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddUserComponent } from './components/admin/customers/add-user/add-user.component';
import { EditUserComponent } from './components/admin/customers/edit-user/edit-user.component';
import { DelUserComponent } from './components/admin/customers/del-user/del-user.component';
import { AuthInterceptor } from './services/auth.service';
import { OrderDetailsComponent } from './components/website/my-orders/order-details/order-details.component';
import { ToastrModule } from 'ngx-toastr';
import { FarmsComponent } from './components/farms/farms/farms.component';
import { AddFarmComponent } from './components/farms/add-farm/add-farm.component';
import { LayoutComponent } from './components/layout/layout.component';
import { IncomeComponent } from './components/farms/income/income.component';
import { InventoryComponent } from './components/farms/inventory/inventory.component';
import { ExpensesComponent } from './components/farms/expenses/expenses.component';
import { AddIncomeComponent } from './components/farms/income/add-income/add-income.component';
import { AddExpensesComponent } from './components/farms/expenses/add-expenses/add-expenses.component';
import { DelExpenseComponent } from './components/farms/expenses/del-expense/del-expense.component';
import { EditExpenseComponent } from './components/farms/expenses/edit-expense/edit-expense.component';
import { EditIncomeComponent } from './components/farms/income/edit-income/edit-income.component';
import { DelIncomeComponent } from './components/farms/income/del-income/del-income.component';
import { EditFarmComponent } from './components/farms/farms/edit-farm/edit-farm.component';
import { DayOldChicksComponent } from './components/farms/day-old-chicks/day-old-chicks.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    MyOrdersComponent,
    CustomersComponent,
    LoginComponent,
    RegisterComponent,
    AddUserComponent,
    EditUserComponent,
    DelUserComponent,
    OrderDetailsComponent,
    FarmsComponent,
    AddFarmComponent,
    LayoutComponent,
    IncomeComponent,
    InventoryComponent,
    ExpensesComponent,
    AddIncomeComponent,
    AddExpensesComponent,
    DelExpenseComponent,
    EditExpenseComponent,
    EditIncomeComponent,
    DelIncomeComponent,
    EditFarmComponent,
    DayOldChicksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
