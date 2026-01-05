import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './history.html'
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'score', 'riskLevel', 'decision', 'reason'];
  dataSource = new MatTableDataSource<any>([]);
  loading = true;
  error: string | null = null;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchHistory();
  }

  fetchHistory(): void {
    this.loading = true;
    this.error = null;

    this.api.get<any[]>('/api/credit-risk/history').subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('History error:', err);
        this.error = 'Failed to load application history';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goApply(): void {
    this.router.navigate(['/apply']);
  }
}



