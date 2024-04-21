import { Component, DoCheck } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'poultry management system';
  isAuthenticated = false;
  isAdminUser = true;

  constructor(private service: AuthService, private router: Router) {}

  navigateToMyOrders() {
    this.router.navigate(['/myorders']);
  }

  //  hooks
  ngDoCheck(): void {
    if (this.service.getUserRole() === 'true') {
      this.isAdminUser = true;
      // this.isAuthenticated = true;
    } else {
      this.isAdminUser = false;
    }

    if (this.service.isloggedin()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  logout() {
    this.service.logout();
    window.location.reload();
  }
}
