import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './apply.html'
})
export class ApplyComponent {
  creditScore = 700;
  annualIncome = 60000;
  existingDebt = 0;
  missedPaymentsLast12Months = 0;

  loading = false;
  result: any = null;
  error: string | null = null;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  submit() {
    this.loading = true;
    this.result = null;
    this.error = null;

    this.api.post<any>('/api/credit-risk/score', {
      creditScore: this.creditScore,
      annualIncome: this.annualIncome,
      existingDebt: this.existingDebt,
      missedPaymentsLast12Months: this.missedPaymentsLast12Months
    }).subscribe({
      next: (res) => {
        console.log('Score response:', res);
        this.result = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Score error:', err);
        this.error = err.error?.message || err.message || 'Failed to calculate score. Are you logged in? Try logging out and back in.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  reset() {
    this.result = null;
    this.error = null;
  }

  goDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goHistory(): void {
    this.router.navigate(['/history']);
  }
}




