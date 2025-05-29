import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LikeService {
  private apiUrl = 'http://localhost:5000/api/likes';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({ 'Authorization': token });
    }
    return new HttpHeaders(); // sin token
  }

  toggleLike(imageId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/toggle`, { imageId }, { headers });
  }

  getLikesCount(imageId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/count/${imageId}`);
  }

  hasUserLiked(imageId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const token = headers.get('Authorization');

    if (!token) {
      // El usuario no está autenticado, devolvemos false sin llamar al backend
      return of({ liked: false });
    }

    return this.http.get(`${this.apiUrl}/liked/${imageId}`, { headers });
  }
}
