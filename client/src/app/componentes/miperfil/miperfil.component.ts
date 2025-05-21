import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // NECESARIO para navegación/routerLink
import { AuthService } from '../../Servicios/auth.service';
import { ImageService } from '../../Servicios/image.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../Servicios/comment.service';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],  // Aquí debes agregar los módulos necesarios
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']  // <- 'styleUrls' con 's', no 'styleUrl'
})
export class MiperfilComponent implements OnInit {
  user: any;
  userImages: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private imageService: ImageService,
    private commentService: CommentService  // Asegúrate de importar el servicio de comentarios
  ) {}

  ngOnInit(): void {


    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.user = this.auth.getUser();
      this.loadUserImages();
    }
  }

  loadUserImages(): void {
  this.imageService.getUserImages(this.user.id).subscribe({
    next: (data) => {
      this.userImages = data;

      // 🔽 Obtener y asignar el total de comentarios para cada imagen
      this.userImages.forEach((img) => {
        this.commentService.getComments(img._id).subscribe({
          next: (comments) => {
            img.commentCount = comments.length;
          },
          error: (err) => {
            console.error(`Error al obtener comentarios para la imagen ${img._id}`, err);
            img.commentCount = 0; // Valor por defecto si falla
          }
        });
      });
    },
    error: (err) => console.error('Error al cargar imágenes del usuario', err)
  });
}


  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
