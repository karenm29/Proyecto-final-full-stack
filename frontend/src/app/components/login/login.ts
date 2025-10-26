import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  loading = false;
  showPassword = false;

  constructor(private api: ApiService, private router: Router) {}

  togglePassword(event: Event): void {
    event.preventDefault();
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  onSubmit(): void {
    this.message = '';
    this.loading = true;
    this.api.login({ correo: this.email, contraseña: this.password }).subscribe({
      next: (res) => {
        // assume res contains token
        if (res?.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.message = res?.message || 'Login successful (no token returned)';
        }
        this.loading = false;
      },
      error: (err) => {
        this.message = err?.error?.message || err?.message || 'Error en login';
        this.loading = false;
      }
    });
  }
}
