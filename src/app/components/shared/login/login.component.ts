import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  loginForm = this.formbuilder.group({
    username: this.formbuilder.control('', Validators.required),
    password: this.formbuilder.control('', Validators.required),
  });

  login(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.loginUser({ username, password }).subscribe(
        (response: any) => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('issuperuser', response.user.is_superuser);
          sessionStorage.setItem('username', response.user.username);
          sessionStorage.setItem('id', response.user.id);
          this.router.navigate(['']);
        },
        (error: any) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}
