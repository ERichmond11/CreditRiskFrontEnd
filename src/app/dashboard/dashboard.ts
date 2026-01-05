import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../core/api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  userName: string = 'User';
  stats: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.extractUserNameFromToken();
    this.loadStats();
  }

  private extractUserNameFromToken(): void {
    const token = this.authService.getToken();
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userName = payload.name || payload.email?.split('@')[0] || 'User';
    } catch {
      this.userName = 'User';
    }
  }

  private loadStats(): void {
    this.api.get<any>('/api/credit-risk/stats').subscribe({
      next: (res) => {
        console.log('Dashboard stats:', res); // 👈 sanity check
        this.stats = res;
        this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
      },
      error: (err) => {
        console.error('Failed to load stats', err);
      }
    });
  }

  goApply(): void {
    this.router.navigate(['/apply']);
  }

  goHistory(): void {
    this.router.navigate(['/history']);
  }

  goWizard(): void {
    this.router.navigate(['/wizard']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

