import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Step {
 private apiUrl = 'http://localhost:3000/step1Form';

  constructor(private http: HttpClient) {}

  getStep1Data(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
