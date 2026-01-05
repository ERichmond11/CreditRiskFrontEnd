import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './credit-wizard.html'
})
export class CreditWizardComponent implements OnInit {

  messages: Message[] = [
    {
      role: 'ai',
      text: "Hello! I'm your Credit Wizard, powered by Google Gemini AI. Ask me anything about your credit."
    }
  ];

  input = '';
  loading = false;
  latestApp: any = null;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLatestApplication();
  }

  loadLatestApplication(): void {
    this.api.get<any[]>('/api/credit-risk/history').subscribe({
      next: (res) => {
        if (res?.length) {
          this.latestApp = res[0];
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      }
    });
  }

  send(): void {
    if (!this.input.trim() || this.loading) return;

    const question = this.input.trim();

    this.messages.push({ role: 'user', text: question });

    const thinkingIndex = this.messages.push({
      role: 'ai',
      text: 'Thinking...'
    }) - 1;

    this.input = '';
    this.loading = true;
    this.cdr.detectChanges();

    const context = this.latestApp
      ? `Score: ${this.latestApp.score}, Decision: ${this.latestApp.decision}, Debt: $${this.latestApp.existingDebt}, Income: $${this.latestApp.annualIncome}, Missed payments: ${this.latestApp.missedPaymentsLast12Months}`
      : 'No applications submitted yet';

    this.api.post<any>('/api/ai/chat', { question, context })
      .subscribe({
        next: (res) => {
          console.log('Wizard API response:', res);

          // 🔥 DO NOT assume res shape
          const text =
            typeof res === 'string'
              ? res
              : res?.response ?? JSON.stringify(res);

          this.messages[thinkingIndex].text = text;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Wizard API error:', err);

          // 🔥 SHOW REAL ERROR INSTEAD OF LYING
          const msg =
            err?.error?.response ||
            err?.error?.message ||
            err?.message ||
            'Unexpected error occurred. Check console.';

          this.messages[thinkingIndex].text = msg;
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  trackByIndex(index: number): number {
    return index;
  }

  goDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}



