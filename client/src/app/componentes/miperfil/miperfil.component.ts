import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Servicios/auth.service';
import { ImageService } from '../../Servicios/image.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../Servicios/comment.service';
import { LikeService } from '../../Servicios/like.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
  user: any;
  userImages: any[] = [];
  dropdownOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private imageService: ImageService,
    private commentService: CommentService,
    private likeService: LikeService
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

        this.userImages.forEach((img) => {
          // Comentarios
          this.commentService.getComments(img._id).subscribe({
            next: (comments) => {
              img.commentCount = comments.length;
            },
            error: () => {
              img.commentCount = 0;
            }
          });

          // Likes
          this.likeService.getLikesCount(img._id).subscribe({
            next: (likeData) => {
              img.likeCount = likeData.likes || 0;
            },
            error: () => {
              img.likeCount = 0;
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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  eliminarPerfil(): void {
    console.log('Eliminar perfil clicked');  // Para depuración
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará tu Cuenta permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.deleteProfile(this.user.id).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Tu Cuenta ha sido eliminada.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            this.logout();
            this.router.navigate(['/homeexplore']);
          },
          error: (err) => {
            console.error('Error al eliminar perfil:', err);
            Swal.fire('Error', 'Ocurrió un error al eliminar el perfil.', 'error');
          }
        });
      }
    });
  }
}
