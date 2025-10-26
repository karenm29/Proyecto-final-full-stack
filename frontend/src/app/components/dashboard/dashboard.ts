import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  userEmail: string = '';
  loading: boolean = true;
  expandedCard: string = '';
  activeSection: string = 'inicio';

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      this.userEmail = tokenData.correo || 'Usuario';
    } catch (e) {
      console.error('Error decodificando el token:', e);
      this.userEmail = 'Usuario';
    }
  }

  toggleCard(cardId: string) {
    this.expandedCard = this.expandedCard === cardId ? '' : cardId;
  }

  setActiveSection(section: string, event: Event) {
    event.preventDefault();
    this.activeSection = section;
    this.expandedCard = '';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
