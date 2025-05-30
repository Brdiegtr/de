import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: {
    nombrecompleto: string;
    name: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getUser() {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null;
  }

  updateProfile(
    id: string,
    data: {
      nombrecompleto: string;
      name: string;
      bio: string;
      email: string;
      password?: string;
    }
  ) {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  deleteProfile(userId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/delete/${userId}`, { headers });
  }
}
