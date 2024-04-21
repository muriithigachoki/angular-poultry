import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
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
