import { Component, Inject } from '@angular/core';
import { ImageService } from '../../Servicios/image.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-upload',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFile: File | null = null;
  descripcion: string = '';
  message: string = '';
  error: boolean = false;
  userId: string = '';

  constructor(
    private imageService: ImageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          this.userId = JSON.parse(user).id || '';
        } catch (e) {
          console.error('Error al parsear localStorage user', e);
        }
      }
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.selectedFile) {
      this.message = 'Debes seleccionar una imagen.';
      this.error = true;
      return;
    }

    this.imageService.uploadImage(this.userId, this.selectedFile, this.descripcion).subscribe({
      next: (res) => {
        this.message = 'Imagen subida correctamente';
        this.error = false;
        this.descripcion = '';
        this.selectedFile = null;
        (document.getElementById('image') as HTMLInputElement).value = '';
      },
      error: (err) => {
        this.message = 'Error al subir imagen: ' + (err.error?.msg || err.message);
        this.error = true;
      }
    });
  }
}
