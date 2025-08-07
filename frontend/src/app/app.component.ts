import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Angular Netlify App';
  apiResponse: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.callApi();
  }

  callApi() {
    this.loading = true;
    this.error = '';
    this.apiResponse = '';

    this.apiService.getHello().subscribe({
      next: (response) => {
        this.apiResponse = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('API Error:', error);
        this.error = `Error calling API: ${error.message || 'Unknown error'}`;
        this.loading = false;
      }
    });
  }

  retryApi() {
    this.callApi();
  }
}
