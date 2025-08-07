import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `<h1>{{ message }}</h1>`,
})
export class AppComponent implements OnInit {
  message = 'Loading...';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://your-backend-url.onrender.com/api/hello', { responseType: 'text' })
      .subscribe(data => this.message = data);
  }
}
