import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:5000/api/likes';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asumiendo que guardas el token en localStorage
    return new HttpHeaders({
      'Authorization': token || ''
    });
  }

  toggleLike(imageId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/toggle`, { imageId }, {
      headers: this.getAuthHeaders()
    });
  }

  getLikesCount(imageId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/count/${imageId}`);
  }

  hasUserLiked(imageId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/liked/${imageId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
