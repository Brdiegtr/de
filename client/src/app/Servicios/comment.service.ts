import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // o donde tengas tu auth

@Injectable({ providedIn: 'root' })
export class CommentService {
  private baseUrl = 'http://localhost:5000/api/comments';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getComments(imageId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${imageId}`);
  }

  addComment(imageId: string, text: string): Observable<any> {
    const token = this.authService.getToken(); // método que obtenga tu token JWT

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/${imageId}`, { text }, { headers });
  }
}
