import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  message = '';
  loading = false;
  showPassword = false;

  togglePassword(event: Event): void {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }

  constructor(private api: ApiService, private router: Router) {}

  onSubmit(): void {
    this.message = '';
    this.loading = true;
    this.api.register({ nombre: this.name, correo: this.email, contraseña: this.password }).subscribe({
      next: (res) => {
        this.loading = false;
        // after register, redirect to login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = err?.error?.message || err?.message || 'Error en registro';
        this.loading = false;
      }
    });
  }
}
