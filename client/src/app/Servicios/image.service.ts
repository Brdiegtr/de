import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:5000/api/images'; // Cambia si es necesario

  constructor(private http: HttpClient) { }

  uploadImage(userId: string, imageFile: File, descripcion: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('descripcion', descripcion);
    formData.append('userId', userId);
    return this.http.post(`${this.apiUrl}/${userId}`, formData);
  }

  getUserImages(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-images/${userId}`);
  }

  getAllImages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
}
