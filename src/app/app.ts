import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div style="padding:40px; font-size:32px; color:red;">
      ANGULAR BOOTSTRAPPED ✅
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor() {
    console.log('🔥 AppComponent constructor ran');
  }
}

