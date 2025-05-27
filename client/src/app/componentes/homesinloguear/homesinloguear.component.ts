import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../Servicios/image.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homesinloguear',
  imports: [CommonModule, FormsModule],
  templateUrl: './homesinloguear.component.html',
  styleUrl: './homesinloguear.component.css'
})
export class HomesinloguearComponent implements OnInit {
  imagenes: any[] = [];

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getAllImages().subscribe({
      next: (data) => {
        this.imagenes = data;
      },
      error: (err) => {
        console.error('Error al cargar imágenes:', err);
      }
    });
  }
}
