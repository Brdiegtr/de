import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Servicios/auth.service';
import { Router } from '@angular/router';  // Importa Router
import { ImageService } from '../../Servicios/image.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  AllImages: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.user = this.auth.getUser();
      this.loadAllImages(); // Llama aquí
    }
  }

  loadAllImages(): void {
    this.imageService.getAllImages().subscribe({
      next: (data: any) => {
        console.log('Imágenes obtenidas:', data); // <-- Aquí se imprime en consola
        this.AllImages = data;
      },
      error: (err) => {
        console.error('Error al cargar las imágenes:', err);
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  goToImageDetails(imageId: string): void {
    this.router.navigate(['/detalle', imageId]);
  }
}
